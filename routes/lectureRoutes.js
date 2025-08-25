import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth.js";
import { uploadLectureFiles } from "../middleware/uploadFile.js";
import {
  createLecture,
  getLectures,
} from "../controllers/lectureControllers.js";

router.post("/:id/lectures", auth, uploadLectureFiles, createLecture);
router.get("/:id/lectures", auth, getLectures);

export default router;
