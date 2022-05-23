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

router.route("/").get(getCompanyAddresses);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteCompanyAddress)
  .get(getCompanyAddress);
router.route("/:company_id").post(addCompanyAddress);
router
  .route("/:address_id/:company_id")
  .patch(verifyTokenAndCompany, updateCompanyAddress);
