const express = require("express");
const {
  addGuard,
  addCompany,
  loginAdmin,
  loginGuard,
  loginCompany,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register/guard", addGuard);
router.post("/register/company", addCompany);
router.post("/login/admin", loginAdmin);
router.post("/login/guard", loginGuard);
router.post("/login/company", loginCompany);

module.exports = router;
