import { Request, Response, NextFunction } from "express";
import { config } from "../config/index.js";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Error:", err);

  const status = err.statusCode || 500;
  const message = err.isOperational
    ? err.message
    : "Something went wrong. Please try again later.";

  res.status(status).json({
    success: false,
    error: message,
    ...(config.env === "development" && { stack: err.stack }),
  });
}
