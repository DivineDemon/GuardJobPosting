import express from "express";
import {
  getDocuments,
  addDocument,
  deleteDocument,
  getDocument,
} from "../controllers/documentController.js";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";
export const router = express.Router();

router
  .route("/")
  .get(getDocuments)
  .post(verifyTokenAndAuthorization, addDocument);
router
  .route("/:id")
  .delete(verifyTokenAndAuthorization, deleteDocument)
  .get(getDocument);
