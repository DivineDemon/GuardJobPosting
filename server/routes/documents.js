import express from "express";
import {
  getDocuments,
  addDocument,
  deleteDocument,
  getDocument,
  // updateDocument,
} from "../controllers/documentController.js";
import { verifyTokenAndGuard } from "../middleware/verifyToken.js";
export const router = express.Router();

router.route("/").get(getDocuments);
router.route("/:id").delete(deleteDocument).get(getDocument);
router.route("/:guard_id").post(addDocument);
// router.route("/:guard_id/:document_id").patch(updateDocument);
