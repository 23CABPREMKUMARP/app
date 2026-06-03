import mongoose from "mongoose";
import connectDB from "../src/lib/db";
import Route from "../src/models/Route";
import Stop from "../src/models/Stop";
import Bus from "../src/models/Bus";
import TownBusTrip from "../src/models/TownBusTrip";

async function seed() {
  try {
    await connectDB();
    console.log("Connected to DB");

    // Create stops
    const gandhipuram = new Stop({
      stopName: "Gandhipuram",
      location: { type: "Point", coordinates: [76.9616, 11.0168] }
    });
    const ukkadam = new Stop({
      stopName: "Ukkadam",
      location: { type: "Point", coordinates: [76.9600, 10.9900] }
    });

    await gandhipuram.save();
    await ukkadam.save();
    console.log("Stops created");

    // Create Route
    const route = new Route({
      routeName: "Gandhipuram - Ukkadam Express",
      routeCode: "R-GU-01",
      startPoint: gandhipuram._id,
      endPoint: ukkadam._id,
      stops: [
        { stopId: gandhipuram._id, stopName: "Gandhipuram", order: 1 },
        { stopId: ukkadam._id, stopName: "Ukkadam", order: 2 }
      ],
      distance: 5,
      estimatedDuration: 20
    });
    await route.save();
    console.log("Route created");

    // Create Bus
    const bus = new Bus({
      busNumber: "TN-38-BZ-1234",
      busCode: "B-GU-01",
      driverName: "Kumar",
      routeId: route._id,
      status: "Stopped",
      fare: 15,
      totalSeats: 40,
      availableSeats: 40,
      departureTime: "08:00 AM",
      arrivalTime: "08:20 AM"
    });
    await bus.save();
    console.log("Bus created");

    // Create TownBusTrip for today and tomorrow
    const today = new Date().toISOString().split('T')[0];
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split('T')[0];

    for (const date of [today, tomorrow]) {
      const trip = new TownBusTrip({
        busId: bus._id,
        routeId: route._id,
        date: date,
        departureTime: "08:00 AM",
        arrivalTime: "08:20 AM",
        fare: 15,
        totalSeats: 40,
        availableSeats: 25,
        crowdStatus: "Medium",
        features: {
          isAC: false,
          isSeater: true,
          isWomenFriendly: true
        }
      });
      await trip.save();
    }
    console.log("Trips created");

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
