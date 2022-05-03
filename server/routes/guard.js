import express from "express";
import { getGuards, deleteGuard } from "../controllers/guardController.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken.js";

export const router = express.Router();

router.route("/").get(verifyTokenAndAdmin, getGuards);
router.route("/:id").delete(verifyTokenAndAdmin, deleteGuard);
