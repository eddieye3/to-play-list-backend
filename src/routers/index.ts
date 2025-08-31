import { Router } from "express";
import authRouter from "./authRouter.js";

const router = Router();

router.get("/", (_req, res) => res.status(200).json({ status: "ok" }));
router.use("/auth", authRouter);

export default router;
