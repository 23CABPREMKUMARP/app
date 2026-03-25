import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  seatNumber: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

export default mongoose.models.Seat || mongoose.model("Seat", SeatSchema);
