const express = require("express");
const {
  getGuardAddresses,
  addGuardAddress,
  deleteGuardAddress,
  getGuardAddress,
  updateGuardAddress,
} = require("../controllers/guardAddressController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndGuard,
} = require("../middleware/verifyToken");

const router = express.Router();

router.route("/").get(getGuardAddresses);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteGuardAddress)
  .get(getGuardAddress);
router.route("/:guard_id").post(addGuardAddress);
router
  .route("/:address_id/:guard_id")
  .patch(verifyTokenAndGuard, updateGuardAddress);

module.exports = router;
