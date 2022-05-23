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

router.route("/");
router
  .route("/:id")
  .get(getJobs)
  .delete(verifyTokenAndCompany, deleteJob)
  .get(getJob);
router.route("/:company_id/:address_id").post(verifyTokenAndCompany, addJob);
router
  .route("/:job_id/:company_id/:address_id")
  .patch(verifyTokenAndCompany, updateJob);
