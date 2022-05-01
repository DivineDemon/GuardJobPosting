import express from "express";
import {
  getAddresses,
  addAddress,
  deleteAddress,
} from "../controllers/addressController.js";
export const router = express.Router();

router.route("/").get(getAddresses).post(addAddress);
router.route("/:id").delete(deleteAddress);
