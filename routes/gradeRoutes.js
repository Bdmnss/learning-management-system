import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth.js";

import { assignGrade } from "../controllers/gradeConrtollers.js";

router.post("/:id/grade", auth, assignGrade);

export default router;
