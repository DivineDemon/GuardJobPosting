import express from "express";
import { getJobs, addJob, deleteJob } from "../controllers/jobController.js";
export const router = express.Router();

router.route("/").get(getJobs).post(addJob);
router.route("/:id").delete(deleteJob);
