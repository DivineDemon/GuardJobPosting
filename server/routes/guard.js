import express from "express";
import {
  getGuards,
  addGuard,
  deleteGuard,
} from "../controllers/guardController.js";
export const router = express.Router();

router.route("/").get(getGuards).post(addGuard);
router.route("/:id").delete(deleteGuard);
