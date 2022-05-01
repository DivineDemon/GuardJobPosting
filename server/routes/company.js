import express from "express";
import {
  getCompanies,
  addCompany,
  deleteCompany,
} from "../controllers/companyController.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken.js";

export const router = express.Router();

router
  .route("/")
  .get(verifyTokenAndAdmin, getCompanies)
  .post(verifyTokenAndAdmin, addCompany);
router.route("/:id").delete(verifyTokenAndAdmin, deleteCompany);
