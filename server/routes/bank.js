const express = require("express");
const {
  getBanks,
  addBank,
  deleteBank,
  getBank,
} = require("../controllers/bankController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndGuard,
} = require("../middleware/verifyToken");

const router = express.Router();

router.route("/").get(verifyTokenAndAdmin, getBanks);
router.route("/:id").delete(verifyTokenAndAdmin, deleteBank).get(getBank);
router.route("/:guard_id").post(verifyTokenAndGuard, addBank);

module.exports = router;
