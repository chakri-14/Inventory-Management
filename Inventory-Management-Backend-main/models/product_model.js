import mongoose from "mongoose";

const Productschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  serialNo: {
    type: String,
    required: true,
  },  
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  rackMountable: {
    type: Boolean,
    default: false,
  },
  isPart: {
    type: Boolean,
    default: false,
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },

  model: {
    type: String,
    required: true,
  },

  dateOfPurchase: {
    type: Date,
    required: true,
  },
  warrantyMonths: {
    type: Number,
    required: true,
  },

  user: {
    type: String,
    required: true,
    enum: ["normal user", "department", "admin"],
    default: "normal user",
  },

  history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "History",
    },
  ],
});

const Product = mongoose.model("Product", Productschema);

export default Product;
