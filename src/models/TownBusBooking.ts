import mongoose from "mongoose";

const TownBusBookingSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "TownBusTrip", required: true },
  seats: [{ type: String, required: true }],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
  bookingDate: { type: Date, default: Date.now },
  boardingPoint: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, enum: ["Confirmed", "Cancelled"], default: "Confirmed" },
  passengers: [
    {
      name: { type: String },
      phone: { type: String },
    },
  ],
  validationStatus: { 
    type: String, 
    enum: ["Active", "Used", "Expired", "Cancelled"], 
    default: "Active" 
  },
  qrToken: { type: String, unique: true },
  scanHistory: [
    {
      scannedBy: { type: String },
      timestamp: { type: Date, default: Date.now },
      location: { type: String },
      action: { type: String }
    }
  ],
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
});

export default mongoose.models.TownBusBooking || mongoose.model("TownBusBooking", TownBusBookingSchema);
