import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectdb = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "ims",
    })
    .then((c) => {
      console.log(`database connected with ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
