const express = require("express");
const {
  addShift,
  deleteShift,
  getShift,
  updateShift,
  getGuardShifts,
  getJobShifts,
  applyShift,
} = require("../controllers/shiftController");
const {
  verifyTokenAndCompany,
  verifyTokenAndGuard,
} = require("../middleware/verifyToken");
const router = express.Router();

router.route("/:id").delete(verifyTokenAndCompany, deleteShift).get(getShift);
router.route("/guard/:guard_id").get(getGuardShifts);
router
  .route("/job/:job_id")
  .get(getJobShifts)
  .post(verifyTokenAndCompany, addShift);
router
  .route("/:shift_id/:job_id/:guard_id")
  .patch(verifyTokenAndCompany, updateShift);
router.route("/apply/:job_id/:guard_id").post(verifyTokenAndGuard, applyShift);

module.exports = router;
