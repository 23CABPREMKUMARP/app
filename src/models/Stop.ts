import mongoose from "mongoose";

const StopSchema = new mongoose.Schema({
  stopName: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

export default mongoose.models.Stop || mongoose.model("Stop", StopSchema);
