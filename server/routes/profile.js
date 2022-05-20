import express from "express";
import {
  guardProfile,
  companyProfile,
} from "../controllers/profileController.js";

export const router = express.Router();

router.get("/guard/:id", guardProfile);
router.get("/company/:id", companyProfile);
