const express = require("express");
const router = express.Router();
const { getCompanyCards, addCompanyCard } = require("../controllers/cardController");

router.route("/:company_id").get(getCompanyCards).post(addCompanyCard);

module.exports = router;
