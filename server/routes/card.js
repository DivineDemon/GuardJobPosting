const express = require("express");
const router = express.Router();
const { getCompanyCards } = require("../controllers/cardController");

router.route("/:company_id").get(getCompanyCards);

module.exports = router;
