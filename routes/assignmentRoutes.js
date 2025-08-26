import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth.js";

import {
  createAssignment,
  getAssignmentsByCourse,
} from "../controllers/assignmentControllers.js";

router.post("/:id/assignments", auth, createAssignment);
router.get("/:id/assignments", auth, getAssignmentsByCourse);

export default router;
