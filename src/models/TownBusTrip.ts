import mongoose from "mongoose";

const TownBusTripSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  fare: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  crowdStatus: { 
    type: String, 
    enum: ["Low", "Medium", "High"], 
    default: "Low" 
  },
  features: {
    isAC: { type: Boolean, default: false },
    isSeater: { type: Boolean, default: true },
    isWomenFriendly: { type: Boolean, default: false },
  }
});

export default mongoose.models.TownBusTrip || mongoose.model("TownBusTrip", TownBusTripSchema);
