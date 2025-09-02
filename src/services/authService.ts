import config from "../config/index.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import { ISafeUserDTO } from "../interfaces/auth/index.js";
import { comparePassword, hashPassword } from "../utils/passwordUtil.js";
import * as userRepo from "../repositories/userRepo.js";
import * as userMapper from "../utils/mappers/userMapper.js";
import { InvalidCredentialsError } from "../errors/authErrors.js";
import { MongoErrorUtil } from "../utils/mongoErrorUtil.js";

export async function findSafeUserByEmail(
  email: string
): Promise<ISafeUserDTO | null> {
  logger.debug(`authService: findUserByEmail: ${email}`);

  const user = await userRepo.findUserByEmail(email);
  return user ? userMapper.toSafeDTO(user) : null;
}

export async function register(
  email: string,
  password: string
): Promise<{ user: ISafeUserDTO; token: string }> {
  logger.debug(`authService: register: ${email}`);

  try {
    const hashedPassword = await hashPassword(password);

    const userDoc = await userRepo.createUser(email, hashedPassword);

    //const user = userMapper.toDTO(userDoc);
    const safeUser = userMapper.toSafeDTO(userDoc);
    const token = jwt.sign(safeUser, config.jwtSecret, { expiresIn: "3d" });

    return { user: safeUser, token };
  } catch (error) {
    MongoErrorUtil.handle(error);
    throw error;
  }
}

export async function login(
  email: string,
  password: string
): Promise<{ user: ISafeUserDTO; token: string }> {
  logger.debug(`authService: login: ${email}`);

  try {
    const userDoc = await userRepo.findUserByEmail(email);
    if (!userDoc) throw new InvalidCredentialsError();

    const isPasswordValid = await comparePassword(password, userDoc.password);
    if (!isPasswordValid) throw new InvalidCredentialsError();

    //update last login date
    userDoc.lastLogin = new Date();
    await userRepo.updateUser(userDoc._id.toString(), userDoc);

    //const user = userMapper.toDTO(userDoc);
    const safeUser = userMapper.toSafeDTO(userDoc);
    const token = jwt.sign(safeUser, config.jwtSecret, { expiresIn: "3d" });

    return { user: safeUser, token };
  } catch (error) {
    MongoErrorUtil.handle(error);
    throw error;
  }
}
