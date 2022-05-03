import express from "express";
import {
  addGuard,
  addCompany,
  loginAdmin,
  loginGuard,
  loginCompany,
} from "../controllers/authController.js";

export const router = express.Router();

router.post("/register/guard", addGuard);
router.post("/register/company", addCompany);
router.post("/login/admin", loginAdmin);
router.post("/login/guard", loginGuard);
router.post("/login/company", loginCompany);
