import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  seats: [{ type: String, required: true }],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
  bookingDate: { type: Date, default: Date.now },
  boardingPoint: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, enum: ["Confirmed", "Cancelled"], default: "Confirmed" },
  passengers: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
  ],
});

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
