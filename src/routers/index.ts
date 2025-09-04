import { Router } from "express";
import authRouter from "./authRouter.js";
import mongoose from "mongoose";

const router = Router();

router.get("/health", (req, res) => {
  const shuttingDown = Boolean(req.app.locals.isShuttingDown);
  const dbReady = mongoose.connection.readyState === 1; // 1 = connected
  const body = {
    status: dbReady && !shuttingDown ? "ok" : "degraded",
    shuttingDown,
    dbState: mongoose.connection.readyState,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  };
  const code = dbReady && !shuttingDown ? 200 : 503;
  res.status(code).json(body);
});
router.use("/auth", authRouter);

export default router;
