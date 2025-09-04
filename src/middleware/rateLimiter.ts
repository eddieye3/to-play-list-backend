// src/middleware/rateLimiters.ts
import rateLimit from "express-rate-limit";
import {
  rateLimitConfig,
  getRateLimitStore,
} from "../config/rateLimitConfig.js";

const store = getRateLimitStore();

const buildLimiter = (
  windowMs: number,
  max: number,
  keyGen?: (req: any) => string
) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests. Try again later." },
    ...(keyGen ? { keyGenerator: keyGen } : {}),
    ...(store ? { store } : {}), // When Redis is implemented, store will be defined
  });

const emailFromQuery = (req: any) =>
  String(req.query?.email ?? "").toLowerCase();
const emailFromBody = (req: any) => String(req.body?.email ?? "").toLowerCase();

export const globalRateLimit = buildLimiter(
  rateLimitConfig.global.windowMs,
  rateLimitConfig.global.max
);

export const userLookupRateLimit = [
  buildLimiter(
    rateLimitConfig.userLookup.ip.windowMs,
    rateLimitConfig.userLookup.ip.max
  ),
  buildLimiter(
    rateLimitConfig.userLookup.email.windowMs,
    rateLimitConfig.userLookup.email.max,
    emailFromQuery
  ),
];

export const loginRateLimit = [
  buildLimiter(rateLimitConfig.login.ip.windowMs, rateLimitConfig.login.ip.max),
  buildLimiter(
    rateLimitConfig.login.email.windowMs,
    rateLimitConfig.login.email.max,
    emailFromBody
  ),
];

export const registerRateLimit = [
  buildLimiter(
    rateLimitConfig.register.ip.windowMs,
    rateLimitConfig.register.ip.max
  ),
  buildLimiter(
    rateLimitConfig.register.email.windowMs,
    rateLimitConfig.register.email.max,
    emailFromBody
  ),
];
