import mongoose from "mongoose";

const TownBusSeatSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "TownBusTrip", required: true },
  seatNumber: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Available", "Locked", "Booked"], 
    default: "Available" 
  },
  category: { 
    type: String, 
    enum: ["Single", "Ladies", "Senior Citizen"], 
    default: "Single" 
  },
  lockedUntil: { type: Date } // Used to temporarily hold a seat during checkout
});

export default mongoose.models.TownBusSeat || mongoose.model("TownBusSeat", TownBusSeatSchema);
