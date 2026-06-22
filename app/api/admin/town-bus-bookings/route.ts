import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

export async function GET() {
  try {
    const { data: bookings, error } = await supabase
      .from('town_bus_bookings')
      .select('*, town_bus_trips(*)')
      .order('booking_date', { ascending: false })
      .limit(100);

    if (error) throw error;
      
    // Map snake_case to camelCase
    const formatted = bookings.map(b => ({
      ...b,
      ticketId: b.ticket_id,
      userId: b.user_id,
      tripId: b.town_bus_trips,
      totalAmount: b.total_amount,
      bookingDate: b.booking_date,
      boardingPoint: b.boarding_point,
      paymentStatus: b.payment_status,
      phonepeTransactionId: b.phonepe_transaction_id
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching Town Bus bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
