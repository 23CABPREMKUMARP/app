import mongoose from "mongoose";

const LuggageBookingSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  senderDetails: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
  },
  receiverDetails: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
  },
  packageCategory: { 
    type: String, 
    enum: ["Small", "Medium", "Large", "Fragile", "Express"], 
    required: true 
  },
  weight: { type: Number, required: true }, // in kg
  dimensions: {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  pickupPoint: { type: String, required: true },
  dropPoint: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: { 
    type: String, 
    enum: ["Pending", "Paid", "Failed"], 
    default: "Pending" 
  },
  status: { 
    type: String, 
    enum: ["Booked", "Picked up", "In Transit", "Reached Destination", "Delivered"], 
    default: "Booked" 
  },
  otp: { type: String, required: true },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  bookingDate: { type: Date, default: Date.now },
  scanHistory: [
    {
      timestamp: { type: Date, default: Date.now },
      location: { type: String },
      status: { type: String },
      updatedBy: { type: String }
    }
  ]
});

export default mongoose.models.LuggageBooking || mongoose.model("LuggageBooking", LuggageBookingSchema);
