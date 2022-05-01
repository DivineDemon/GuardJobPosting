import express from "express";
import {
  getDocuments,
  addDocument,
  deleteDocument,
} from "../controllers/documentController.js";
export const router = express.Router();

router.route("/").get(getDocuments).post(addDocument);
router.route("/:id").delete(deleteDocument);
