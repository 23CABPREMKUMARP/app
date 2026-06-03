import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectMongo from '@/src/lib/db';
import LuggageBooking from '@/src/models/LuggageBooking';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    await connectMongo();
    
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

    if (action === 'initialize') {
      const options = {
        amount: Math.round(totalAmount * 100), 
        currency: "INR",
        receipt: `receipt_lug_${Date.now()}`
      };

      const order = await razorpay.orders.create(options);

      const trackingId = `TRK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP for delivery
      
      const newLuggage = new LuggageBooking({
        trackingId,
        userId,
        senderDetails,
        receiverDetails,
        packageCategory,
        weight,
        dimensions,
        pickupPoint,
        dropPoint,
        totalAmount,
        otp,
        paymentStatus: 'Pending',
        status: 'Booked', 
        razorpayOrderId: order.id,
        scanHistory: [{ status: 'Booked', location: pickupPoint, updatedBy: 'System' }]
      });

      await newLuggage.save();

      return NextResponse.json({ order, trackingId });
    }

    if (action === 'verify') {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, trackingId } = body;

      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(sign.toString())
        .digest("hex");

      if (razorpay_signature !== expectedSign) {
        return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
      }

      const booking = await LuggageBooking.findOneAndUpdate(
        { trackingId },
        { 
          paymentStatus: 'Paid',
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature
        },
        { new: true }
      );

      return NextResponse.json({ success: true, booking });
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
