import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/src/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      userId, 
      tripId, 
      seats, 
      totalAmount, 
      boardingPoint, 
      destination, 
      passengers,
      action,
      phonepeTransactionId,
      paymentGateway = 'PhonePe'
    } = body;

    // Supabase validation check
    let isSimulationMode = false;
    if (tripId === 'mock-trip-1' || !tripId.includes('-')) {
      isSimulationMode = true;
    }

    if (action === 'initialize' || action === 'book') {
      const ticketId = `TB-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const bookingData = {
        ticket_id: ticketId,
        user_id: userId,
        trip_id: isSimulationMode ? null : tripId, // Cannot insert invalid UUID into Supabase
        seats,
        total_amount: totalAmount,
        boarding_point: boardingPoint,
        destination,
        passengers,
        payment_status: 'Paid',
        status: 'Confirmed', 
        qr_token: crypto.randomBytes(16).toString('hex'),
        phonepe_transaction_id: phonepeTransactionId || 'T' + Date.now() + Math.floor(Math.random() * 1000),
        payment_gateway: paymentGateway,
      };

      if (!isSimulationMode) {
        try {
          // Insert booking into Supabase
          const { error: bookingError } = await supabase
            .from('town_bus_bookings')
            .insert([bookingData]);

          if (bookingError) throw bookingError;

          // Mark seats as Booked directly
          for (const seat of seats) {
             await supabase
               .from('town_bus_seats')
               .update({ status: 'Booked', locked_until: null })
               .eq('trip_id', tripId)
               .eq('seat_number', seat);
          }

        } catch (e) {
          console.error("Failed to save to Supabase, continuing in simulation", e);
          isSimulationMode = true;
        }
      }

      // Convert snake_case back to camelCase for the frontend expectation
      const frontendBooking = {
        ticketId: bookingData.ticket_id,
        userId: bookingData.user_id,
        tripId: bookingData.trip_id,
        seats: bookingData.seats,
        totalAmount: bookingData.total_amount,
        boardingPoint: bookingData.boarding_point,
        destination: bookingData.destination,
        passengers: bookingData.passengers,
        paymentStatus: bookingData.payment_status,
        status: bookingData.status,
        qrToken: bookingData.qr_token
      };

      return NextResponse.json({ success: true, booking: frontendBooking, ticketId, isSimulation: isSimulationMode });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Error in town bus booking:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}
