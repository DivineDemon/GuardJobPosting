import express from "express";
import {
  getCompanies,
  deleteCompany,
  getCompany,
  updateCompany,
} from "../controllers/companyController.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndCompany,
} from "../middleware/verifyToken.js";

export const router = express.Router();

router.route("/").get(verifyTokenAndAdmin, getCompanies);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteCompany)
  .get(verifyTokenAndAdmin, getCompany)
  .patch(verifyTokenAndCompany, updateCompany);
