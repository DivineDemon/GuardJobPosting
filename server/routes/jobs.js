const express = require("express");
const {
  getJobs,
  addJob,
  deleteJob,
  getJob,
  updateJob,
  getCompanyJobs,
} = require("../controllers/jobsController");
const {
  verifyTokenAndGuard,
  verifyTokenAndCompany,
} = require("../middleware/verifyToken");
const router = express.Router();

router.route("/").get(verifyTokenAndGuard, getJobs);
router.route("/:id").delete(verifyTokenAndCompany, deleteJob).get(getJob);
router
  .route("/:job_id/:company_id/:address_id")
  .patch(verifyTokenAndCompany, updateJob);
router
  .route("/company/:company_id")
  .get(getCompanyJobs)
  .post(verifyTokenAndCompany, addJob);

module.exports = router;
