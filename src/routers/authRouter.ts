import { Router } from "express";
import * as authController from "../controllers/authController.js";
import {
  userLookupRateLimit,
  loginRateLimit,
  registerRateLimit,
} from "../middleware/rateLimiter.js";

const router = Router();

// Rate limit time in config/rateLimitConfig.ts
// GET /api/auth/user?email=...
router.get("/user", userLookupRateLimit, authController.getRegisteredUser);
// POST /api/auth/login
router.post("/login", loginRateLimit, authController.login);
// POST /api/auth/register
router.post("/register", registerRateLimit, authController.register);

export default router;
