const express = require("express");
const {
  guardProfile,
  companyProfile,
} = require("../controllers/profileController");

const router = express.Router();

router.get("/guard/:id", guardProfile);
router.get("/company/:id", companyProfile);

module.exports = router;
