import express from "express";
import {
  getShifts,
  addShift,
  deleteShift,
  getShift,
  updateShift,
} from "../controllers/shiftController.js";
import { verifyTokenAndCompany } from "../middleware/verifyToken.js";
export const router = express.Router();

router.route("/").get(getShifts);
router.route("/:id").delete(verifyTokenAndCompany, deleteShift).get(getShift);
router.route("/:job_id/:guard_id").post(verifyTokenAndCompany, addShift);
router
  .route("/:shift_id/:job_id/:guard_id")
  .patch(verifyTokenAndCompany, updateShift);
