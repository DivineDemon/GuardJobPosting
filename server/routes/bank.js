import express from "express";
import {
  getBanks,
  addBank,
  deleteBank,
  getBank,
  updateBank,
} from "../controllers/bankController.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndGuard,
} from "../middleware/verifyToken.js";

export const router = express.Router();

router
  .route("/")
  .get(verifyTokenAndAdmin, getBanks)
  .post(verifyTokenAndGuard, addBank);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteBank)
  .get(getBank)
  .patch(verifyTokenAndAdmin, updateBank);
