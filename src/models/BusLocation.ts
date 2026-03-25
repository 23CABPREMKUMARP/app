import mongoose from "mongoose";

const BusLocationSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.BusLocation || mongoose.model("BusLocation", BusLocationSchema);
