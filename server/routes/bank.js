import express from "express";
import {
  getBanks,
  addBank,
  deleteBank,
} from "../controllers/bankController.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken";

export const router = express.Router();

router
  .route("/")
  .get(verifyTokenAndAdmin, getBanks)
  .post(verifyTokenAndAdmin, addBank);
router.route("/:id").delete(verifyTokenAndAdmin, deleteBank);
