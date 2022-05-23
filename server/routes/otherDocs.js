import express from "express";
import {
  getOtherdocs,
  addOtherdocs,
  deleteOtherdocs,
  updateOtherdocs,
} from "../controllers/otherdocsController.js";
import {
  verifyTokenAndGuard,
  verifyTokenAndAdmin,
} from "../middleware/verifyToken.js";

export const router = express.Router();

router.route("/").get(verifyTokenAndAdmin, getOtherdocs);
router.route("/:id").delete(verifyTokenAndGuard, deleteOtherdocs);
router.route("/:guard_id").post(verifyTokenAndGuard, addOtherdocs);
router
  .route("/:document_id/:guard_id")
  .patch(verifyTokenAndGuard, updateOtherdocs);
