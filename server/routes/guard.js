const express = require("express");
const {
  getGuards,
  deleteGuard,
  getGuard,
  updateGuard,
  updateGuardStatus,
} = require("../controllers/guardController");
const {
  verifyTokenAndGuard,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = express.Router();

router.get("/getall/:status", verifyTokenAndAdmin, getGuards);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteGuard)
  .get(verifyTokenAndAdmin, getGuard);
router.route("/:guard_id/:address_id").patch(verifyTokenAndGuard, updateGuard);
router
  .route("/upstat/:guard_id/:admin_id/:status")
  .patch(verifyTokenAndAdmin, updateGuardStatus);

module.exports = router;
