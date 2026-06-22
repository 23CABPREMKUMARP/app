import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { MOCK_BUSES } from "@/src/lib/constants";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({ success: false, message: "Code required" }, { status: 400 });
    }

    const { data: bus, error } = await supabase
      .from('buses')
      .select('*, routes(*, stops(*))')
      .eq('bus_code', code.toUpperCase())
      .single();

    if (error || !bus) {
      console.warn("DB offline or bus not found. Using mock query fallback.");
      const mockBus = MOCK_BUSES.find(b => b.busCode === code.toUpperCase());
      if (mockBus) {
        return NextResponse.json({ success: true, bus: mockBus });
      }
      return NextResponse.json({ success: false, message: "Bus not found" }, { status: 404 });
    }

    const formattedBus = {
      ...bus,
      _id: bus.id,
      busNumber: bus.bus_number,
      busCode: bus.bus_code,
      routeId: bus.routes,
      departureTime: bus.departure_time,
      arrivalTime: bus.arrival_time,
      availableSeats: bus.available_seats
    };

    return NextResponse.json({ success: true, bus: formattedBus });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
