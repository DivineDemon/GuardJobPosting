import express from "express";
import { guardProfile } from "../controllers/profileController.js";

export const router = express.Router();

router.route("/:id").get(guardProfile);
