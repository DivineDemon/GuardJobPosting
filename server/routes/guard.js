import express from "express";
import { getGuards, addGuard } from "../controllers/guardController.js";
export const router = express.Router();

router.route("/").get(getGuards).post(addGuard);
