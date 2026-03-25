import { NextResponse } from "next/server";
import connectDB from "@/src/lib/db";
import Bus from "@/src/models/Bus";
import Route from "@/src/models/Route";
import BusLocation from "@/src/models/BusLocation";

export async function GET() {
  try {
    await connectDB();
    const buses = await Bus.find().populate("routeId");
    
    // Get latest location for each bus
    const busesWithLocation = await Promise.all(
      buses.map(async (bus) => {
        const latestLocation = await BusLocation.findOne({ busId: bus._id }).sort({ timestamp: -1 });
        return {
          ...bus.toObject(),
          location: latestLocation || { lat: 13.0827, lng: 80.2707 }, // Default to Chennai center
        };
      })
    );

    return NextResponse.json(busesWithLocation);
  } catch (error) {
    console.error("Error fetching buses:", error);
    return NextResponse.json({ error: "Failed to fetch buses" }, { status: 500 });
  }
}
