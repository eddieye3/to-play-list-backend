import mongoose from "mongoose";
import { AppError } from "../errors/appError.js";

export class MongoErrorUtil {
  static handle(err: any): void {
    // Validation errors (schema rules violated)
    if (err instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(err.errors).map((e: any) => e.message);
      throw new AppError(messages.join("; "), 400);
    }

    // Cast errors (bad ObjectId or type conversion)
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(`Invalid value for ${err.path}: ${err.value}`, 400);
    }

    // Duplicate key error (E11000)
    if (err.code === 11000) {
      const keyValue = (err.keyValue ?? {}) as Record<string, any>;
      const field = Object.keys(keyValue)[0] ?? "field";
      const value = keyValue[field];
      throw new AppError(`${field} already exists: ${value}`, 409);
    }

    // Server selection / connection errors
    if (
      err instanceof mongoose.Error.MongooseServerSelectionError ||
      err.name === "MongoNetworkError" ||
      err.name === "MongoServerError"
    ) {
      throw new AppError("Database unavailable, please try again later.", 503);
    }
  }
}
