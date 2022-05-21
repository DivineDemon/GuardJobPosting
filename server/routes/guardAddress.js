import express from "express";
import {
  getGuardAddresses,
  addGuardAddress,
  deleteGuardAddress,
  getGuardAddress,
  updateGuardAddress,
} from "../controllers/guardAddressController.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndGuard,
} from "../middleware/verifyToken.js";

export const router = express.Router();

router.route("/").get(getGuardAddresses).post(addGuardAddress);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteGuardAddress)
  .get(getGuardAddress)
  .patch(verifyTokenAndGuard, updateGuardAddress);
