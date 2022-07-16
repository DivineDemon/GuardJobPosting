const express = require("express");
const {
  getCompanyDocuments,
  addCompanyDocument,
  deleteCompanyDocument,
  getCompanyDocument,
} = require("../controllers/companyDocumentController");
const { verifyTokenAndCompany } = require("../middleware/verifyToken");

const router = express.Router();

router.route("/").get(getCompanyDocuments);
router.route("/:id").delete(deleteCompanyDocument).get(getCompanyDocument);
router.route("/company/:company_id").post(addCompanyDocument);

module.exports = router;
