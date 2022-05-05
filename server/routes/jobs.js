import express from "express";
import {
  getJobs,
  addJob,
  deleteJob,
  getJob,
} from "../controllers/jobsController.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken.js";
export const router = express.Router();

router.route("/").get(getJobs).post(verifyTokenAndAdmin, addJob);
router.route("/:id").delete(verifyTokenAndAdmin, deleteJob).get(getJob);
