import express from "express";
import { getJobs, addJob, deleteJob } from "../controllers/jobController.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken";
export const router = express.Router();

router.route("/").get(getJobs).post(verifyTokenAndAdmin, addJob);
router.route("/:id").delete(verifyTokenAndAdmin, deleteJob);
