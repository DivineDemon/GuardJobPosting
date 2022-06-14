const express = require("express");
const {
  getCompanyAddresses,
  addCompanyAddress,
  deleteCompanyAddress,
  getCompanyAddress,
  updateCompanyAddress,
} = require("../controllers/companyAddressController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndCompany,
} = require("../middleware/verifyToken");

const router = express.Router();

router.route("/").get(getCompanyAddresses);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteCompanyAddress)
  .get(getCompanyAddress);
router.route("/:company_id").post(addCompanyAddress);
router
  .route("/:address_id/:company_id")
  .patch(verifyTokenAndCompany, updateCompanyAddress);

module.exports = router;
