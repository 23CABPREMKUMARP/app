import { NextResponse } from "next/server";
import connectDB from "@/src/lib/db";
import Booking from "@/src/models/Booking";
import Bus from "@/src/models/Bus";
import Seat from "@/src/models/Seat";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    const {
      userId,
      busId,
      passengers,
      seats,
      totalAmount,
      boardingPoint,
      destination,
    } = data;

    // Verify seats availability if needed, but for dummy we just book them
    
    // Generate unique ticket id
    const ticketId = `TKT-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

    const newBooking = new Booking({
      ticketId,
      userId,
      busId,
      seats,
      totalAmount,
      boardingPoint,
      destination,
      passengers,
      paymentStatus: "Paid", // Simplified for dummy demo
    });

    await newBooking.save();

    // Mark seats as booked
    await Seat.updateMany(
      { busId, seatNumber: { $in: seats } },
      { $set: { isBooked: true } }
    );

    // Update available seats count in Bus model
    await Bus.findByIdAndUpdate(busId, {
      $inc: { availableSeats: -seats.length },
    });

    return NextResponse.json({
      success: true,
      booking: newBooking,
      message: "Booking confirmed!",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
