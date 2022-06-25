const express = require("express");
const {
  getShifts,
  addShift,
  deleteShift,
  getShift,
  updateShift,
  getGuardShifts,
} = require("../controllers/shiftController");
const { verifyTokenAndCompany } = require("../middleware/verifyToken");
const router = express.Router();

router.route("/").get(getShifts);
router.route("/:id").delete(verifyTokenAndCompany, deleteShift).get(getShift);
router.route("/guard/:guard_id").get(getGuardShifts);
router.route("/job/:job_id").get(getJobShifts);
router.route("/:job_id/:guard_id").post(verifyTokenAndCompany, addShift);
router
  .route("/:shift_id/:job_id/:guard_id")
  .patch(verifyTokenAndCompany, updateShift);

module.exports = router;
