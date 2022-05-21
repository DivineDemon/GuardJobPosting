import express from "express";
import {
  getCompanyAddresses,
  addCompanyAddress,
  deleteCompanyAddress,
  getCompanyAddress,
  updateCompanyAddress,
} from "../controllers/companyAddressController.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndCompany,
} from "../middleware/verifyToken.js";

export const router = express.Router();

router.route("/").get(getCompanyAddresses).post(addCompanyAddress);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteCompanyAddress)
  .get(getCompanyAddress)
  .patch(verifyTokenAndCompany, updateCompanyAddress);
