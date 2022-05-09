import express from "express";
import {
  getAddresses,
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../controllers/addressController.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken.js";

export const router = express.Router();

router.route("/").get(getAddresses).post(verifyTokenAndAdmin, addAddress);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteAddress)
  .get(getAddress)
  .patch(verifyTokenAndAdmin, updateAddress);
