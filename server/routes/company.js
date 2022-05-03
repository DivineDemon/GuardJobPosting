import express from "express";
import {
  getCompanies,
  deleteCompany,
} from "../controllers/companyController.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken.js";

export const router = express.Router();

router.route("/").get(verifyTokenAndAdmin, getCompanies);
router.route("/:id").delete(verifyTokenAndAdmin, deleteCompany);
