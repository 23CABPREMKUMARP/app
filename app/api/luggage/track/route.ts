import { NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingId = searchParams.get('trackingId');

    if (!trackingId) {
      return NextResponse.json({ error: 'Tracking ID is required' }, { status: 400 });
    }

    const { data: booking, error } = await supabase
      .from('luggage_bookings')
      .select('*')
      .eq('tracking_id', trackingId)
      .single();

    if (error || !booking) {
      return NextResponse.json({ error: 'Luggage tracking ID not found' }, { status: 404 });
    }

    const formattedBooking = {
      ...booking,
      trackingId: booking.tracking_id,
      userId: booking.user_id,
      senderDetails: booking.sender_details,
      receiverDetails: booking.receiver_details,
      packageCategory: booking.package_category,
      pickupPoint: booking.pickup_point,
      dropPoint: booking.drop_point,
      totalAmount: booking.total_amount,
      paymentStatus: booking.payment_status,
      scanHistory: booking.scan_history
    };

    return NextResponse.json({ booking: formattedBooking });
  } catch (error) {
    console.error('Error tracking luggage:', error);
    return NextResponse.json(
      { error: 'Failed to track luggage' },
      { status: 500 }
    );
  }
}
