import { NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase';

export async function POST(req: Request) {
  return handleCallback(req);
}

export async function GET(req: Request) {
  return handleCallback(req);
}

async function handleCallback(req: Request) {
  try {
    const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin;
    const url = new URL(req.url);
    const tripId = url.searchParams.get('tripId');
    const ticketId = url.searchParams.get('ticketId');
    
    let transactionId = url.searchParams.get('merchantOrderId') || url.searchParams.get('transactionId');

    // -------------------------------------------------------
    // POST = S2S Server-to-Server Webhook from PhonePe.
    // Parse payload and update DB as a background sync.
    // -------------------------------------------------------
    if (req.method === 'POST') {
      try {
        let isSuccess = false;
        const formData = await req.formData().catch(() => null);

        if (formData && (formData.has('code') || formData.has('state'))) {
          const code = formData.get('code') || formData.get('state');
          transactionId = transactionId || (formData.get('transactionId') as string) || (formData.get('merchantOrderId') as string);
          isSuccess = code === 'PAYMENT_SUCCESS' || code === 'COMPLETED' || code === 'SUCCESS';

        } else if (formData && formData.has('response')) {
          const responseBody = formData.get('response') as string;
          const parsedResponse = JSON.parse(Buffer.from(responseBody, 'base64').toString('utf-8'));
          isSuccess = parsedResponse.success === true || parsedResponse.code === 'PAYMENT_SUCCESS';
          transactionId = transactionId || parsedResponse.data?.merchantTransactionId || parsedResponse.data?.transactionId || parsedResponse.merchantOrderId;

        } else {
          const clonedReq = req.clone();
          const body = await clonedReq.json().catch(() => null);
          if (body) {
            let parsedResponse = body;
            if (typeof body.response === 'string') {
              parsedResponse = JSON.parse(Buffer.from(body.response, 'base64').toString('utf-8'));
            }
            isSuccess = parsedResponse.success === true || parsedResponse.code === 'PAYMENT_SUCCESS';
            transactionId = transactionId || parsedResponse.data?.merchantTransactionId || parsedResponse.data?.transactionId || parsedResponse.merchantOrderId;
          }
        }

        // Only update DB on S2S webhooks (no tripId = pure server-to-server call)
        if (!tripId && (transactionId || ticketId)) {
          const matchColumn = transactionId ? 'phonepe_transaction_id' : 'ticket_id';
          const matchValue = transactionId || ticketId;

          if (isSuccess) {
            const { data: booking } = await supabase
              .from('town_bus_bookings')
              .update({ payment_status: 'Paid', status: 'Confirmed' })
              .eq(matchColumn, matchValue!)
              .select().single();
            if (booking?.seats && booking?.trip_id) {
              for (const seat of booking.seats) {
                await supabase.from('town_bus_seats')
                  .update({ status: 'Booked', locked_until: null })
                  .eq('trip_id', booking.trip_id).eq('seat_number', seat);
              }
            }
          } else {
            const { data: booking } = await supabase
              .from('town_bus_bookings')
              .update({ payment_status: 'Failed', status: 'Cancelled' })
              .eq(matchColumn, matchValue!)
              .select().single();
            if (booking?.seats && booking?.trip_id) {
              for (const seat of booking.seats) {
                await supabase.from('town_bus_seats')
                  .update({ status: 'Available', locked_until: null })
                  .eq('trip_id', booking.trip_id).eq('seat_number', seat);
              }
            }
          }
          return NextResponse.json({ success: true, message: "Webhook processed" });
        }
      } catch (e) {
        console.error("Could not parse POST body in PhonePe Callback", e);
      }
    }

    // -------------------------------------------------------
    // GET or POST with tripId = Browser redirect from PhonePe.
    // DO NOT touch the DB. Just redirect to the verify page.
    // The Status API will call PhonePe and update the DB.
    // -------------------------------------------------------
    if (tripId) {
      // Look up transactionId by ticketId if not present in the URL
      if (!transactionId && ticketId) {
        const { data: booking } = await supabase
          .from('town_bus_bookings')
          .select('phonepe_transaction_id')
          .eq('ticket_id', ticketId)
          .single();
        if (booking?.phonepe_transaction_id) {
          transactionId = booking.phonepe_transaction_id;
        }
      }

      const redirectUrl = new URL(`/town-bus/${tripId}/seat-selection`, origin);
      redirectUrl.searchParams.set('payment', 'verify');
      if (transactionId) redirectUrl.searchParams.set('transactionId', transactionId);
      if (ticketId) redirectUrl.searchParams.set('ticketId', ticketId);
      
      return NextResponse.redirect(redirectUrl.toString(), { status: 302 });
    }

    return NextResponse.json({ success: true, message: "Webhook processed" });

  } catch (error) {
    console.error("Error in PhonePe callback:", error);
    return NextResponse.redirect(new URL('/?error=payment_failed', req.url).toString(), { status: 302 });
  }
}
