const express = require("express");
const {
  getJobs,
  addJob,
  deleteJob,
  getJob,
  updateJob,
  getCompanyJobs,
  getAppliedJobs,
} = require("../controllers/jobsController");
const {
  verifyTokenAndGuard,
  verifyTokenAndCompany,
} = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", getJobs);
router.route("/:id").delete(verifyTokenAndCompany, deleteJob).get(getJob);
router
  .route("/:job_id/:company_id/:address_id")
  .patch(verifyTokenAndCompany, updateJob);
router
  .route("/company/:company_id")
  .get(getCompanyJobs)
  .post(verifyTokenAndCompany, addJob);
router.get("/applied/:job_id/:guard_id", getAppliedJobs);

module.exports = router;
