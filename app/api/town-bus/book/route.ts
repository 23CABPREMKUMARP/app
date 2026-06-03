import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectMongo from '@/src/lib/db';
import TownBusBooking from '@/src/models/TownBusBooking';
import TownBusSeat from '@/src/models/TownBusSeat';
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
      tripId, 
      seats, 
      totalAmount, 
      boardingPoint, 
      destination, 
      passengers,
      action
    } = body;

    // Action: Initialize Payment
    if (action === 'initialize') {
      // Create Razorpay Order
      const options = {
        amount: Math.round(totalAmount * 100), // amount in the smallest currency unit
        currency: "INR",
        receipt: `receipt_tb_${Date.now()}`
      };

      const order = await razorpay.orders.create(options);

      // Create Pending Booking
      const ticketId = `TB-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const newBooking = new TownBusBooking({
        ticketId,
        userId,
        tripId,
        seats,
        totalAmount,
        boardingPoint,
        destination,
        passengers,
        paymentStatus: 'Pending',
        status: 'Confirmed', // Will be confirmed fully after payment
        qrToken: crypto.randomBytes(16).toString('hex'),
        razorpayOrderId: order.id
      });

      await newBooking.save();

      // Lock seats temporarily (optional improvement: add lock expiry)
      await TownBusSeat.updateMany(
        { tripId: tripId, seatNumber: { $in: seats } },
        { $set: { status: 'Locked', lockedUntil: new Date(Date.now() + 10 * 60000) } }
      );

      return NextResponse.json({ order, ticketId });
    }

    // Action: Verify Payment
    if (action === 'verify') {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, ticketId } = body;

      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(sign.toString())
        .digest("hex");

      if (razorpay_signature !== expectedSign) {
        return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
      }

      // Update Booking
      const booking = await TownBusBooking.findOneAndUpdate(
        { ticketId },
        { 
          paymentStatus: 'Paid',
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature
        },
        { new: true }
      );

      // Mark seats as Booked
      if (booking) {
        await TownBusSeat.updateMany(
          { tripId: booking.tripId, seatNumber: { $in: booking.seats } },
          { $set: { status: 'Booked', lockedUntil: null } }
        );
      }

      return NextResponse.json({ success: true, booking });
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
