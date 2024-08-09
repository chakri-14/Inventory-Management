import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    editedBy: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
  },

  {
    timestamps: true,
  }
);

const LocationModel = mongoose.model("Company", companySchema);

export default LocationModel;
