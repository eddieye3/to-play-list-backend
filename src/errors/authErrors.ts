import { AppError } from "./appError.js";

export class InvalidCredentialsError extends AppError {
  constructor() {
    super("Invalid credentials", 401, true);
  }
}
