import express from "express";
import {
  getJobAddresses,
  addJobAddress,
  deleteJobAddress,
  getJobAddress,
  updateJobAddress,
} from "../controllers/jobAddressController.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndCompany,
} from "../middleware/verifyToken.js";

export const router = express.Router();

router.route("/").get(getJobAddresses);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteJobAddress)
  .get(getJobAddress);
router.route("/:job_id").post(addJobAddress);
router
  .route("/:address_id/:job_id")
  .patch(verifyTokenAndCompany, updateJobAddress);
