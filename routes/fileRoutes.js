import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth.js";
import { uploadAssignmentFile } from "../middleware/uploadFile.js";
import { createFile, getFilesById } from "../controllers/fileControllers.js";

router.post("/upload", auth, uploadAssignmentFile, createFile);
router.get("/:id", auth, getFilesById);

export default router;
