import mongoose from "mongoose";

const BusRoutePathSchema = new mongoose.Schema({
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
  points: [
    {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  ],
});

export default mongoose.models.BusRoutePath || mongoose.model("BusRoutePath", BusRoutePathSchema);
