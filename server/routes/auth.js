import express from "express";
import { addGuard, loginUser } from "../controllers/authController.js";

export const router = express.Router();

router.post("/register", addGuard);
router.post("/login", loginUser);
