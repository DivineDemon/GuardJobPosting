const express = require("express");
const {
  getJobs,
  addJob,
  deleteJob,
  getJob,
  updateJob,
} = require("../controllers/jobsController");
const { verifyTokenAndCompany } = require("../middleware/verifyToken");
const router = express.Router();

router.route("/");
router
  .route("/:id")
  .get(getJobs)
  .delete(verifyTokenAndCompany, deleteJob)
  .get(getJob);
router.route("/:company_id/:address_id").post(verifyTokenAndCompany, addJob);
router
  .route("/:job_id/:company_id/:address_id")
  .patch(verifyTokenAndCompany, updateJob);

module.exports = router;
