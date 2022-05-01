import express from "express";
import {
  getCompanies,
  addCompany,
  deleteCompany,
} from "../controllers/companyController.js";
export const router = express.Router();

router.route("/").get(getCompanies).post(addCompany);
router.route("/:id").delete(deleteCompany);
