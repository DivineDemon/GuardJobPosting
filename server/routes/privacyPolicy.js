const express = require("express");
const { getPolicy } = require("../controllers/privacyController");

const router = express.Router();

router.get("/", getPolicy);

module.exports = router;
