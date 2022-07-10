const express = require("express");
const {
  getDocuments,
  addDocument,
  deleteDocument,
  getDocument,
} = require("../controllers/documentController");
const { verifyTokenAndGuard } = require("../middleware/verifyToken");

const router = express.Router();

router.route("/").get(getDocuments);
router.route("/:id").delete(deleteDocument).get(getDocument);
router.route("/guard/:guard_id").post(addDocument);

module.exports = router;
