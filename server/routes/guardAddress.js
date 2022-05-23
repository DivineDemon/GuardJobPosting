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

router.route("/").get(getGuardAddresses);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteGuardAddress)
  .get(getGuardAddress);
router.route("/:guard_id").post(addGuardAddress);
router
  .route("/:address_id/:guard_id")
  .patch(verifyTokenAndGuard, updateGuardAddress);
