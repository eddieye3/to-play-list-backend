import config from "./config/index.js";
import app from "./app.js";
import { connectDB, disconnectDB } from "./config/mongoDBConfig.js";
import logger from "./utils/logger.js";

const PORT = config.port;

connectDB();

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

function initiateShutdown(signal: string) {
  logger.info(`${signal} received: starting graceful shutdown`);
  app.locals.isShuttingDown = true;

  const FORCE_EXIT_MS = 10000; // 10s hard timeout
  const timer = setTimeout(() => {
    logger.error("Forced shutdown due to timeout");
    process.exit(1);
  }, FORCE_EXIT_MS);
  timer.unref();

  server.close(async (err?: Error) => {
    if (err) {
      logger.error("Error closing HTTP server:", err);
    }
    try {
      await disconnectDB();
    } finally {
      logger.info("Shutdown complete");
      process.exit(0);
    }
  });
}

process.on("SIGTERM", () => initiateShutdown("SIGTERM"));
process.on("SIGINT", () => initiateShutdown("SIGINT"));
process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection:", reason);
  initiateShutdown("unhandledRejection");
});
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  initiateShutdown("uncaughtException");
});
