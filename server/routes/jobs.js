import express from "express";
import {
  getJobs,
  addJob,
  deleteJob,
  getJob,
  updateJob,
} from "../controllers/jobsController.js";
import { verifyTokenAndCompany } from "../middleware/verifyToken.js";
export const router = express.Router();

router.route("/").get(getJobs).post(verifyTokenAndCompany, addJob);
router
  .route("/:id")
  .delete(verifyTokenAndCompany, deleteJob)
  .get(getJob)
  .patch(verifyTokenAndCompany, updateJob);
