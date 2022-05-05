import express from "express";
import {
  getGuards,
  deleteGuard,
  getGuard,
} from "../controllers/guardController.js";
import { verifyToken, verifyTokenAndAdmin } from "../middleware/verifyToken.js";

export const router = express.Router();

router.get("/", verifyTokenAndAdmin, getGuards);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteGuard)
  .get(verifyTokenAndAdmin, getGuard);
