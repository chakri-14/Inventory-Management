import mongoose from "mongoose";
const Userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, //password won't included mainly used for sensitive info
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("User", Userschema);

export default User;
