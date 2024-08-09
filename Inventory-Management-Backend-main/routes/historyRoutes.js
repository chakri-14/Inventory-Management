import express from "express";
import HistoryModel from "../models/history_model.js";

const historyRouter = express.Router();

// historyRouter.get("/", async (req, res) => {
//   const { _id } = req.body;

 
//   const historyData = await HistoryModel.findById(_id);
// });



export default historyRouter;
