const express = require("express");
const {
  getJobAddresses,
  addJobAddress,
  deleteJobAddress,
  getJobAddress,
  updateJobAddress,
} = require("../controllers/jobAddressController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndCompany,
} = require("../middleware/verifyToken");

const router = express.Router();

router.route("/").get(getJobAddresses);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteJobAddress)
  .get(getJobAddress);
router.route("/:job_id").post(addJobAddress);
router
  .route("/:address_id/:job_id")
  .patch(verifyTokenAndCompany, updateJobAddress);

module.exports = router;
