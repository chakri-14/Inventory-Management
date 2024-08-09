import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    createdBy: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    editedBy: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },

    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const LocationModel = mongoose.model("Location", locationSchema);

export default LocationModel;
