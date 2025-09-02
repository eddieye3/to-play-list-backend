export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(
    message = "Something went wrong. Please try again later.",
    statusCode = 500,
    isOperational = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}
