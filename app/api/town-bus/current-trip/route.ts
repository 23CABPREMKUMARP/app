import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { MOCK_BUSES } from "@/src/lib/constants";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const busId = searchParams.get("busId");
    const busCode = searchParams.get("busCode");

    if (!busId && !busCode) {
      return NextResponse.json({ error: "Missing bus identifier" }, { status: 400 });
    }

    // Attempt to find bus
    let query = supabase.from('buses').select('*');
    if (busCode) {
      query = query.eq('bus_code', busCode);
    } else if (busId) {
      query = query.eq('id', busId);
    }
    
    const { data: bus, error: busError } = await query.single();

    if (busError || !bus) {
      console.log("Bus not found in Supabase DB, falling back to mock data");
      const mockTrip = MOCK_BUSES.find(b => b.busCode === busCode || b._id === busId) || MOCK_BUSES[0];
      return NextResponse.json(mockTrip);
    }

    // Fetch the active trip for this bus
    const { data: trip, error: tripError } = await supabase
      .from('town_bus_trips')
      .select('*, routes(*, stops(*))')
      .eq('bus_number', bus.bus_number)
      .limit(1)
      .single();

    if (tripError || !trip) {
      console.log("No active trips found in Supabase DB, falling back to mock data");
      const mockTrip = MOCK_BUSES.find(b => b.busCode === busCode || b._id === busId) || MOCK_BUSES[0];
      return NextResponse.json(mockTrip);
    }

    // Map properties to expected frontend standard (camelCase)
    const formattedTrip = {
       ...trip,
       _id: trip.id,
       busId: bus,
       routeId: trip.routes,
       departureTime: trip.departure_time,
       arrivalTime: trip.arrival_time,
       availableSeats: trip.available_seats
    };

    return NextResponse.json(formattedTrip);
  } catch (error) {
    console.error("Error fetching current trip:", error);
    
    try {
      const { searchParams } = new URL(req.url);
      const busId = searchParams.get("busId");
      const busCode = searchParams.get("busCode");
      const mockTrip = MOCK_BUSES.find(b => b.busCode === busCode || b._id === busId) || MOCK_BUSES[0];
      return NextResponse.json(mockTrip);
    } catch(e) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}
