import logger from "../utils/logger.js";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/errorHandler.js";
import { findUserByEmail } from "../services/authService.js";
import {
  RegisteredUserResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  LoginResponse,
} from "../interfaces/auth/index.js";

export async function getRegisteredUser(
  req: Request<{}, any, {}, { email: string }>,
  res: Response<RegisteredUserResponse>,
  next: NextFunction
): Promise<void> {
  try {
    const email = req.query.email;
    logger.debug(`getRegisteredUser: ${email}`);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      throw new AppError("Invalid email address.", 400);
    }

    const user = await findUserByEmail(email);
    const response: RegisteredUserResponse = {
      isRegistered: user !== null,
    };

    logger.debug(`response: ${response.isRegistered}`);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request<{}, any, LoginRequest>,
  res: Response<LoginResponse>,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;
    logger.debug(`login: ${email} ${password}`);

    const response: LoginResponse = {
      token: "1234567890",
      message: "Login successful",
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function register(
  req: Request<{}, any, RegisterRequest>,
  res: Response<RegisterResponse>,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;
    logger.debug(`register: ${email} ${password}`);

    const response: RegisterResponse = {
      token: "1234567890",
      message: "Register successful",
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
