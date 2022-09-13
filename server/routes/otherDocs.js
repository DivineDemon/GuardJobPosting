const express = require("express");
const {
  getOtherdocs,
  addOtherdocs,
  deleteOtherdocs,
  updateOtherdocs,
} = require("../controllers/otherdocsController");
const {
  verifyTokenAndGuard,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = express.Router();

router.route("/").get(verifyTokenAndAdmin, getOtherdocs);
router.route("/:id").delete(verifyTokenAndGuard, deleteOtherdocs);
router.route("/add/:guard_id").post(addOtherdocs);
router
  .route("/:document_id/:guard_id")
  .patch(verifyTokenAndGuard, updateOtherdocs);

module.exports = router;
