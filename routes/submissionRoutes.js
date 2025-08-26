import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth.js";
import { uploadAssignmentFile } from "../middleware/uploadFile.js";
import {
  createSubmission,
  getSubmissionsByAssignment,
} from "../controllers/submissionControllers.js";

router.post("/:id/submit", auth, uploadAssignmentFile, createSubmission);
router.get("/:id/submissions", auth, getSubmissionsByAssignment);

export default router;
