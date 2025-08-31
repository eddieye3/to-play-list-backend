import { User, UserDocument } from "../models/User.js";

export async function findUserByEmail(
  email: string
): Promise<UserDocument | null> {
  return await User.findOne({ email });
}
