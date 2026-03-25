import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  path: [
    {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  ],
  stops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stop" }],
});

export default mongoose.models.Route || mongoose.model("Route", RouteSchema);
