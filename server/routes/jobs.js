const express = require("express");
const {
  getJobs,
  addJob,
  deleteJob,
  getJob,
  updateJob,
  getCompanyJobs,
  getAppliedJobs,
  getNonAppliedJobs,
} = require("../controllers/jobsController");
const { verifyTokenAndCompany } = require("../middleware/verifyToken");
const router = express.Router();

router.get("/:guard_id", getJobs);
router.route("/:id").delete(verifyTokenAndCompany, deleteJob).get(getJob);
router
  .route("/:job_id/:company_id/:address_id")
  .patch(verifyTokenAndCompany, updateJob);
router
  .route("/company/:company_id")
  .get(getCompanyJobs)
  .post(verifyTokenAndCompany, addJob);
router.get("/applied/:job_id/:guard_id", getAppliedJobs);
router.get("/nonapplied", getNonAppliedJobs);

module.exports = router;
