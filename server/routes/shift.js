import express from "express";
import {
  getShifts,
  addShift,
  deleteShift,
} from "../controllers/shiftController.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken";
export const router = express.Router();

router.route("/").get(getShifts).post(verifyTokenAndAdmin, addShift);
router.route("/:id").delete(verifyTokenAndAdmin, deleteShift);
