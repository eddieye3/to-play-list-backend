import winston from "winston";
import { config } from "../config/index.js";

// Define custom log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for log levels
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

// Add colors to winston
winston.addColors(colors);

// Determine environment
const isProduction = config.env === "production";

// Define log format for development
const devFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    ({ timestamp, level, message, stack }) =>
      `${timestamp} ${level}: ${stack || message}`
  )
);

// Define log format for production
const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Create logger instance
const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  levels,
  format: isProduction ? prodFormat : devFormat,
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
  // Let the global error handler manage errors
  exitOnError: false,
});

export default logger;
