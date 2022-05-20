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

router
  .route("/")
  .get(verifyTokenAndAdmin, getOtherdocs)
  .post(verifyTokenAndGuard, addOtherdocs);
router
  .route("/:id")
  .patch(verifyTokenAndGuard, updateOtherdocs)
  .delete(verifyTokenAndGuard, deleteOtherdocs);
