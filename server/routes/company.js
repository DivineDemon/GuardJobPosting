const express = require("express");
const {
  getCompanies,
  deleteCompany,
  getCompany,
  updateCompany,
} = require("../controllers/companyController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndCompany,
} = require("../middleware/verifyToken");

const router = express.Router();

router.route("/").get(verifyTokenAndAdmin, getCompanies);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteCompany)
  .get(verifyTokenAndAdmin, getCompany)
  .patch(verifyTokenAndCompany, updateCompany);

module.exports = router;
