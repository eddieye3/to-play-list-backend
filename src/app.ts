import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import config from "./config/index.js";
import mainRouter from "./routers/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { globalRateLimit } from "./middleware/rateLimiter.js";

const app = express();
app.locals.isShuttingDown = false;

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

app.use(globalRateLimit);
app.use("/api", mainRouter);

app.use(errorHandler);

export default app;
