import { NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      userId, 
      senderDetails,
      receiverDetails,
      packageCategory,
      weight,
      dimensions,
      pickupPoint,
      dropPoint,
      totalAmount,
      action
    } = body;

    if (action === 'initialize' || action === 'book') {

      const trackingId = `TRK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP for delivery
      
      const luggageData = {
        tracking_id: trackingId,
        user_id: userId,
        sender_details: senderDetails,
        receiver_details: receiverDetails,
        package_category: packageCategory,
        weight,
        dimensions,
        pickup_point: pickupPoint,
        drop_point: dropPoint,
        total_amount: totalAmount,
        otp,
        payment_status: 'Paid',
        status: 'Booked', 
        scan_history: [{ status: 'Booked', location: pickupPoint, updatedBy: 'System' }]
      };

      const { data: newLuggage, error } = await supabase
        .from('luggage_bookings')
        .insert([luggageData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Convert to camelCase for frontend
      const formattedLuggage = {
        ...newLuggage,
        trackingId: newLuggage.tracking_id,
        userId: newLuggage.user_id,
        senderDetails: newLuggage.sender_details,
        receiverDetails: newLuggage.receiver_details,
        packageCategory: newLuggage.package_category,
        pickupPoint: newLuggage.pickup_point,
        dropPoint: newLuggage.drop_point,
        totalAmount: newLuggage.total_amount,
        paymentStatus: newLuggage.payment_status,
        scanHistory: newLuggage.scan_history
      };

      return NextResponse.json({ success: true, trackingId, booking: formattedLuggage });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Error in luggage booking:', error);
    return NextResponse.json(
      { error: 'Failed to process luggage booking' },
      { status: 500 }
    );
  }
}
