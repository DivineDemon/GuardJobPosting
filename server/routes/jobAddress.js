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

router.route("/").get(getJobAddresses).post(addJobAddress);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deleteJobAddress)
  .get(getJobAddress)
  .patch(verifyTokenAndCompany, updateJobAddress);
