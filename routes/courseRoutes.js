import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth.js";

import {
  createCourse,
  enrollCourse,
  getAllCourses,
  getCourseById,
} from "../controllers/courseControllers.js";

router.post("/", auth, createCourse);
router.get("/", getAllCourses);
router.post("/:id/enroll", auth, enrollCourse);
router.get("/:id", getCourseById);

export default router;
