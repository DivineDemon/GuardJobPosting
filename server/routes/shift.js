import express from "express";
import {
  getShifts,
  addShift,
  deleteShift,
  getShift,
} from "../controllers/shiftController.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken.js";
export const router = express.Router();

router.route("/").get(getShifts).post(verifyTokenAndAdmin, addShift);
router.route("/:id").delete(verifyTokenAndAdmin, deleteShift).get(getShift);
