import { Router } from "express";
import {
  getRegisteredUser,
  login,
  register,
} from "../controllers/authController.js";

const router = Router();

// GET /api/auth/user?email=...
router.get("/user", getRegisteredUser);
// POST /api/auth/login
router.post("/login", login);
// POST /api/auth/register
router.post("/register", register);

export default router;
