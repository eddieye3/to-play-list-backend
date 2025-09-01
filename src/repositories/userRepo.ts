import { UserModel, UserDocument } from "../models/User.js";

export async function findUserByEmail(
  email: string
): Promise<UserDocument | null> {
  return await UserModel.findOne({ email });
}
