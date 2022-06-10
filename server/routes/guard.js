import express from "express";
import {
  getGuards,
  deleteGuard,
  getGuard,
  updateGuard,
  updateGuardStatus,
} from "../controllers/guardController.js";
import {
  verifyTokenAndGuard,
  verifyTokenAndAdmin,
} from "../middleware/verifyToken.js";

export const router = express.Router();

router.get("/getall/:status", verifyTokenAndAdmin, getGuards);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteGuard)
  .get(verifyTokenAndAdmin, getGuard)
router.route("/:guard_id/:address_id/:admin_id").patch(verifyTokenAndGuard, updateGuard);
router.route("/upstat/:guard_id/:admin_id/:status").patch(verifyTokenAndAdmin, updateGuardStatus);
