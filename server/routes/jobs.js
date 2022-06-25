const express = require("express");
const {
  getJobs,
  addJob,
  deleteJob,
  getJob,
  updateJob,
  getCompanyJobs,
} = require("../controllers/jobsController");
const { verifyTokenAndCompany } = require("../middleware/verifyToken");
const router = express.Router();

router.route("/").get(getJobs);
router.route("/:id").delete(verifyTokenAndCompany, deleteJob).get(getJob);
router.route("/:company_id/:address_id").post(verifyTokenAndCompany, addJob);
router
  .route("/:job_id/:company_id/:address_id")
  .patch(verifyTokenAndCompany, updateJob);
router.route("/company/:company_id").get(getCompanyJobs);

module.exports = router;
