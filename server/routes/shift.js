import express from "express";
import {
  getShifts,
  addShift,
  deleteShift,
} from "../controllers/shiftController.js";
export const router = express.Router();

router.route("/").get(getShifts).post(addShift);
router.route("/:id").delete(deleteShift);
