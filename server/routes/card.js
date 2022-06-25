const express = require("express");
const router = express.Router();
import { getCompanyCards } from "../controllers/cardController";

router.route("/:company_id").get(getCompanyCards);

module.exports = router;
