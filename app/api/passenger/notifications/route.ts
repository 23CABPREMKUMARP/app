import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ success: false, message: "Missing phone identifier" }, { status: 400 });
    }

    try {
      // Fetch notifications sorted by latest
      const { data: notifications, error } = await supabase
        .from('notifications')
        .select('*, buses(*)')
        .eq('phone', phone)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const formattedNotifications = notifications.map(n => ({
        ...n,
        busId: n.buses || n.bus_id,
        ticketId: n.ticket_id,
        createdAt: n.created_at
      }));

      return NextResponse.json({ success: true, notifications: formattedNotifications });
    } catch (dbError) {
      console.warn("Supabase query failed. Returning empty notifications array.", dbError);
      return NextResponse.json({ success: true, notifications: [] });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
