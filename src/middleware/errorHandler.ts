import { Request, Response, NextFunction } from "express";
import config from "../config/index.js";
import logger from "../utils/logger.js";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(`${err.message}\r\n${err.stack}`);

  const status = err.statusCode || 500;
  const message = err.isOperational
    ? err.message
    : "Something went wrong. Please try again later.";

  res.status(status).json({
    message: message,
    ...(config.env === "development" && { stack: err.stack }),
  });
}
