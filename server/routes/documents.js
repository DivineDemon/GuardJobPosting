import express from "express";
import {
  getDocuments,
  addDocument,
  deleteDocument,
  getDocument,
} from "../controllers/documentController.js";
import { verifyTokenAndGuard } from "../middleware/verifyToken.js";
export const router = express.Router();

router
  .route("/")
  .get(getDocuments)
  .post(verifyTokenAndGuard, addDocument);
router
  .route("/:id")
  .delete(verifyTokenAndGuard, deleteDocument)
  .get(getDocument);
