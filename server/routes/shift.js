const express = require("express");
const {
  getGuardShifts,
  getJobShifts,
  getShift,
  addShift,
  deleteShift,
  updateShift,
  applyShift,
  getAppliedShifts,
  approveShifts,
  getApprovedShifts,
  getCompanyShifts,
  getCompanyShiftsHistory,
  getCompanyFutureShifts,
  getPendingShifts,
} = require("../controllers/shiftController");
const {
  verifyTokenAndCompany,
  verifyTokenAndGuard,
} = require("../middleware/verifyToken");
const router = express.Router();

router.route("/:id").delete(verifyTokenAndCompany, deleteShift).get(getShift);
router
  .route("/company/:company_id")
  .get(verifyTokenAndCompany, getAppliedShifts);
router.route("/guard/:guard_id").post(getGuardShifts);
router.get("/job/:job_id", getJobShifts);
router.post("/job/:job_id/:company_id", verifyTokenAndCompany, addShift);
router
  .route("/:shift_id/:job_id/:guard_id")
  .patch(verifyTokenAndCompany, updateShift);
router.route("/apply/:job_id/:guard_id").post(verifyTokenAndGuard, applyShift);
router.put("/approve/guard/:guard_id", verifyTokenAndCompany, approveShifts);
router.get("/approved", getApprovedShifts);
router.get("/pending", getPendingShifts);
router.post("/company/approved/:company_id", getCompanyShifts);
router.post("/company/approved/history/:company_id", getCompanyShiftsHistory);
router.post("/company/approved/future/:company_id", getCompanyFutureShifts);

module.exports = router;
