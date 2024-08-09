import express from "express";
import {
  getAllUsers,
  getMyprofile,
  login,
  logout,
  register,
} from "../controllers/user_controllers.js";
import { isAuthenticated } from "../middlewares/user_auth.js";
import User from "../models/user_model.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/all", getAllUsers);

router.patch("/chage-role", isAuthenticated, async (req, res) => {
  const { targetUserId, role } = req.body;
  const user = req.user;
  if (!targetUserId) {
    return res.status(404).json({ message: "please provide target user id" });
  }
  if (user.role !== "admin") {
    return res
      .status(400)
      .json({ message: "Not authorized to make this call" });
  }

  await User.findByIdAndUpdate(targetUserId, {
    $set: {
      role: role,
    },
  });

  return res.status(200).json({ message: "success" });
});

router.get("/me", isAuthenticated, getMyprofile);

export default router;
