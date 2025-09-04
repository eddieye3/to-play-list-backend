import logger from "../utils/logger.js";
import { Request, Response } from "express";
import { EMAIL_REGEX } from "../constants/index.js";
import { InvalidCredentialsError } from "../errors/authErrors.js";
import {
  RegisteredUserResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  LoginResponse,
} from "../interfaces/auth/index.js";
import * as authService from "../services/authService.js";

export async function getRegisteredUser(
  req: Request<{}, any, {}, { email: string }>,
  res: Response<RegisteredUserResponse>
): Promise<void> {
  const email = req.query.email.toLowerCase();
  logger.debug(`authController: getRegisteredUser: ${email}`);

  if (!validateEmail(email)) {
    throw new InvalidCredentialsError();
  }
  const user = await authService.findSafeUserByEmail(email);
  logger.debug(`response: ${user?.email} is registered: ${user !== null}`);
  res.status(200).json({ isRegistered: user !== null });
}

export async function register(
  req: Request<{}, any, RegisterRequest>,
  res: Response<RegisterResponse>
): Promise<void> {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();
  logger.debug(`authController: register: ${normalizedEmail}`);

  if (!validateUserInput(normalizedEmail, password)) {
    throw new InvalidCredentialsError();
  }
  const { user, token } = await authService.register(normalizedEmail, password);
  const response = { token, user, message: "Register successful" };
  res.status(201).json(response);
}

export async function login(
  req: Request<{}, any, LoginRequest>,
  res: Response<LoginResponse>
): Promise<void> {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();
  logger.debug(`authController: login: ${normalizedEmail}`);

  if (!validateUserInput(normalizedEmail, password)) {
    throw new InvalidCredentialsError();
  }
  const { user, token } = await authService.login(normalizedEmail, password);
  const response = { token, user, message: "Login successful" };
  res.status(200).json(response);
}

// TODO: Use a validator library
function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

function validateUserInput(email: string, password: string): boolean {
  return (
    validateEmail(email) &&
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9]/.test(password)
  );
}
