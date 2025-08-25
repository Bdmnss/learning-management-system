import express from "express";
const router = express.Router();

import { auth, isAdmin } from "../middleware/auth.js";

import { getAllUsers, getProfile } from "../controllers/userControllers.js";

router.get("/", auth, isAdmin, getAllUsers);
router.get("/me", auth, getProfile);

export default router;
