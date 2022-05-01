import express from "express";
import {
  getGuards,
  addGuard,
  deleteGuard,
} from "../controllers/guardController.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken";

export const router = express.Router();

router
  .route("/")
  .get(verifyTokenAndAdmin, getGuards)
  .post(verifyTokenAndAdmin, addGuard);
router.route("/:id").delete(verifyTokenAndAdmin, deleteGuard);
