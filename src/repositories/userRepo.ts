import { UserModel, UserDocument } from "../models/user.js";
import logger from "../utils/logger.js";

export async function findUserByEmail(
  email: string
): Promise<UserDocument | null> {
  return await UserModel.findOne({ email });
}

export async function createUser(
  email: string,
  password: string
): Promise<UserDocument> {
  const user = await UserModel.create({ email, password });
  logger.debug(`User Created: ${user?.email}`);
  return user;
}

export async function updateUser(
  id: string,
  user: UserDocument
): Promise<UserDocument | null> {
  return await UserModel.findByIdAndUpdate(id, user, { new: true });
}
