import express from "express";
import LocationModel from "../models/locations_models.js";
import { isAuthenticated } from "../middlewares/user_auth.js";

const locationRouter = express.Router();

locationRouter.get("/", async (req, res) => {
  const locations = await LocationModel.find()
    .populate("createdBy")
    .populate("editedBy");

  return res.status(200).json(locations || []);
});

locationRouter.get("/:id", async (req, res) => {
  const locations = await LocationModel.findById(req.params.id)
    .populate("createdBy")
    .populate("editedBy");

  return res.status(200).json(locations || []);
});

locationRouter.patch("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const editedBy = req.user._id;
    await LocationModel.findByIdAndUpdate(req.params.id, {
      $set: {
        name,
        description,
        editedBy,
      },
    });

    return res.status(200).json();
  } catch (e) {
    throw next(e);
  }
});

locationRouter.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const user_id = req.user._id;
    const location = new LocationModel({
      createdBy: user_id,
      name,
      description,
    });

    await location.save();
    return res.status(200).json({ message: "Success" });
  } catch (e) {
    throw next(e);
  }
});

export default locationRouter;
