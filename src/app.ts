import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import config from "./config/index.js";
import rateLimit from "express-rate-limit";
import mainRouter from "./routers/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express();

app.use(helmet());

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

if (config.env === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

app.use("/api", mainRouter);

app.use(errorHandler);

export default app;
