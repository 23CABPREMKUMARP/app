import mongoose from 'mongoose';
import Bus from './src/models/Bus';
import Route from './src/models/Route';
import Stop from './src/models/Stop';
import BusLocation from './src/models/BusLocation';
import Seat from './src/models/Seat';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bus-booking";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Clear existing
  await Promise.all([
    Bus.deleteMany({}),
    Route.deleteMany({}),
    Stop.deleteMany({}),
    BusLocation.deleteMany({}),
    Seat.deleteMany({}),
  ]);

  // Create Stops
  const stops = await Stop.create([
    { stopName: "Guindy", lat: 13.0067, lng: 80.2206 },
    { stopName: "T Nagar", lat: 13.0405, lng: 80.2337 },
    { stopName: "Mylapore", lat: 13.0333, lng: 80.2685 },
    { stopName: "Adyar", lat: 13.0012, lng: 80.2565 },
    { stopName: "Velachery", lat: 12.9791, lng: 80.2198 },
    { stopName: "OMR", lat: 12.8711, lng: 80.2263 },
    { stopName: "Tambaram", lat: 12.9231, lng: 80.1264 },
  ]);

  // Create Routes
  const route1 = await Route.create({
    routeName: "Anna Salai Line",
    from: "Guindy",
    to: "T Nagar",
    path: [
      { lat: 13.0067, lng: 80.2206 },
      { lat: 13.015, lng: 80.225 },
      { lat: 13.0405, lng: 80.2337 },
    ],
    stops: [stops[0]._id, stops[1]._id],
  });

  const route2 = await Route.create({
    routeName: "ECR Express",
    from: "Mylapore",
    to: "OMR",
    path: [
      { lat: 13.0333, lng: 80.2685 },
      { lat: 13.0012, lng: 80.2565 },
      { lat: 12.92, lng: 80.24 },
      { lat: 12.8711, lng: 80.2263 },
    ],
    stops: [stops[2]._id, stops[3]._id, stops[5]._id],
  });

  // Create Buses
  const buses = await Bus.create([
    {
      busNumber: "TN-01-AB-1234",
      driverName: "Senthil Kumar",
      routeId: route1._id,
      status: "Running",
      speed: 45,
      fare: 25,
      totalSeats: 40,
      availableSeats: 25,
      departureTime: "08:00 AM",
      arrivalTime: "09:30 AM",
    },
    {
      busNumber: "TN-01-XY-5678",
      driverName: "Rajesh",
      routeId: route2._id,
      status: "Running",
      speed: 60,
      fare: 50,
      totalSeats: 40,
      availableSeats: 15,
      departureTime: "09:30 AM",
      arrivalTime: "11:30 AM",
    },
    {
        busNumber: "TN-01-CD-9012",
        driverName: "Mani",
        routeId: route2._id,
        status: "Stopped",
        speed: 0,
        fare: 45,
        totalSeats: 40,
        availableSeats: 35,
        departureTime: "10:30 AM",
        arrivalTime: "12:30 PM",
    }
  ]);

  // Create Seats for each bus
  for (const bus of buses) {
    const seatsList = [];
    for (let i = 1; i <= 40; i++) {
      seatsList.push({
            busId: bus._id,
            seatNumber: i.toString(),
            isBooked: Math.random() < 0.3
        });
    }
    await Seat.insertMany(seatsList);
    
    // Update available count based on what we actually created
    const booked = seatsList.filter(s => s.isBooked).length;
    await Bus.findByIdAndUpdate(bus._id, { availableSeats: 40 - booked });
  }

  // Create Locations
  await BusLocation.create([
    { busId: buses[0]._id, lat: 13.011, lng: 80.222 },
    { busId: buses[1]._id, lat: 13.02, lng: 80.26 },
    { busId: buses[2]._id, lat: 13.0333, lng: 80.2685 },
  ]);

  console.log('Seed completed successfully');
  await mongoose.disconnect();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
