const express = require("express");
const {
  getBanks,
  addBank,
  deleteBank,
  getBank,
  updateBank,
} = require("../controllers/bankController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndGuard,
} = require("../middleware/verifyToken");

const router = express.Router();

router.route("/").get(verifyTokenAndAdmin, getBanks);
router.route("/:id").delete(verifyTokenAndAdmin, deleteBank).get(getBank);
router.route("/:guard_id").post(verifyTokenAndGuard, addBank);
router.route("/:bank_id/:guard_id").patch(verifyTokenAndAdmin, updateBank);

module.exports = router;
