import express from "express";
import {
  getBanks,
  addBank,
  deleteBank,
} from "../controllers/bankController.js";
export const router = express.Router();

router.route("/").get(getBanks).post(addBank);
router.route("/:id").delete(deleteBank);
