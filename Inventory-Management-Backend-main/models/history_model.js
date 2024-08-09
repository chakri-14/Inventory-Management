  import mongoose from "mongoose";

  const historySchema = new mongoose.Schema(
    {
      location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
      },
      status: [
        {
          name: {
            type: String,
            required: true,
            enum: ["repair", "in use", "not in use"],
          },
          date: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
    },
    {
      timestamps: true,
    }
  );

  const HistoryModel = mongoose.model("History", historySchema);

  export default HistoryModel;
