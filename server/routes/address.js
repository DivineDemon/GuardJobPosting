import express from "express";
import {
  getAddresses,
  addAddress,
  deleteAddress,
} from "../controllers/addressController.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken.js";

export const router = express.Router();

router
  .route("/")
  .get(verifyTokenAndAdmin, getAddresses)
  .post(verifyTokenAndAdmin, addAddress);
router.route("/:id").delete(verifyTokenAndAdmin, deleteAddress);
