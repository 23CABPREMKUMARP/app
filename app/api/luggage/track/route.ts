import { NextResponse } from 'next/server';
import connectMongo from '@/src/lib/db';
import LuggageBooking from '@/src/models/LuggageBooking';

export async function GET(request: Request) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const trackingId = searchParams.get('trackingId');

    if (!trackingId) {
      return NextResponse.json({ error: 'Tracking ID is required' }, { status: 400 });
    }

    const booking = await LuggageBooking.findOne({ trackingId });

    if (!booking) {
      return NextResponse.json({ error: 'Luggage tracking ID not found' }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error tracking luggage:', error);
    return NextResponse.json(
      { error: 'Failed to track luggage' },
      { status: 500 }
    );
  }
}
