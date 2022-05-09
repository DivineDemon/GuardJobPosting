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

router.route("/").get(getShifts).post(verifyTokenAndCompany, addShift);
router
  .route("/:id")
  .delete(verifyTokenAndCompany, deleteShift)
  .get(getShift)
  .patch(verifyTokenAndCompany, updateShift);
