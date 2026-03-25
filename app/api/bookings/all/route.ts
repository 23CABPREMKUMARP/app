import { NextResponse } from "next/server";
import connectDB from "@/src/lib/db";
import Booking from "@/src/models/Booking";
import Bus from "@/src/models/Bus";
import Route from "@/src/models/Route";

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find()
      .populate({
        path: "busId",
        populate: { path: "routeId" }
      })
      .sort({ bookingDate: -1 });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
