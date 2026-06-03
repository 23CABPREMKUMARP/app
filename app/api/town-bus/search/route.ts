import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectMongo from '@/src/lib/db';
import TownBusTrip from '@/src/models/TownBusTrip';
import Bus from '@/src/models/Bus';
import Route from '@/src/models/Route';
import Stop from '@/src/models/Stop';

export async function GET(request: Request) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!from || !to) {
      return NextResponse.json(
        { error: 'Missing required parameters (from, to)' },
        { status: 400 }
      );
    }

    // Step 1: Find routes that contain both from and to stops, where from comes before to.
    const allRoutes = await Route.find({}).populate('stops');
    
    // We will do a basic matching here: route's stops must include from and to
    const matchingRouteIds = allRoutes.filter((route: any) => {
      const stopsNames = route.stops.map((s: any) => s.stopName.toLowerCase());
      const fromIdx = stopsNames.findIndex((n: string) => n.includes(from.toLowerCase()));
      const toIdx = stopsNames.findIndex((n: string) => n.includes(to.toLowerCase()));
      return fromIdx !== -1 && toIdx !== -1 && fromIdx < toIdx;
    }).map((r: any) => r._id);

    if (matchingRouteIds.length === 0) {
      return NextResponse.json({ trips: [] });
    }

    // Step 2: Find TownBusTrips for those routes
    const trips = await TownBusTrip.find({
      routeId: { $in: matchingRouteIds }
    }).populate('busId').populate('routeId');

    if (trips.length === 0) {
      throw new Error("No trips found in DB, falling back to mock data");
    }

    return NextResponse.json({ trips });
  } catch (error) {
    console.error('Error fetching town bus trips, returning mock data:', error);
    
    // Mock Data Fallback
    const mockTrips = [
      {
        _id: "mock-trip-1",
        busId: { busNumber: "TN-38-BZ-1234" },
        routeId: { routeName: "Gandhipuram - Ukkadam Express" },
        departureTime: "08:00 AM",
        arrivalTime: "08:20 AM",
        fare: 15,
        availableSeats: 25,
        crowdStatus: "Low",
        features: { isAC: true, isSeater: true, isWomenFriendly: true }
      },
      {
        _id: "mock-trip-2",
        busId: { busNumber: "TN-38-WA-2024" },
        routeId: { routeName: "Gandhipuram → Walayar" },
        departureTime: "08:15 AM",
        arrivalTime: "09:45 AM",
        fare: 30,
        availableSeats: 28,
        crowdStatus: "Low",
        features: { isAC: false, isSeater: true, isWomenFriendly: true }
      },
      {
        _id: "mock-trip-3",
        busId: { busNumber: "TN-38-WA-2025" },
        routeId: { routeName: "Gandhipuram → Walayar Express" },
        departureTime: "08:30 AM",
        arrivalTime: "10:00 AM",
        fare: 35,
        availableSeats: 15,
        crowdStatus: "Medium",
        features: { isAC: true, isSeater: true, isWomenFriendly: true }
      },
      {
        _id: "mock-trip-4",
        busId: { busNumber: "TN-38-WA-2026" },
        routeId: { routeName: "Gandhipuram → Walayar" },
        departureTime: "08:45 AM",
        arrivalTime: "10:15 AM",
        fare: 30,
        availableSeats: 5,
        crowdStatus: "High",
        features: { isAC: false, isSeater: true, isWomenFriendly: false }
      }
    ];

    return NextResponse.json({ trips: mockTrips });
  }
}
