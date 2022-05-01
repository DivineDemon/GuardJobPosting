import express from "express";
import {
  getDocuments,
  addDocument,
  deleteDocument,
} from "../controllers/documentController.js";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken";
export const router = express.Router();

router
  .route("/")
  .get(getDocuments)
  .post(verifyTokenAndAuthorization, addDocument);
router.route("/:id").delete(verifyTokenAndAuthorization, deleteDocument);
