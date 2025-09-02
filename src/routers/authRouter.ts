import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

// GET /api/auth/user?email=...
router.get("/user", authController.getRegisteredUser);
// POST /api/auth/login
router.post("/login", authController.login);
// POST /api/auth/register
router.post("/register", authController.register);

export default router;
