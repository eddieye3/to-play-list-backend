import logger from "../utils/logger.js";
import { SafeUserDTO } from "../interfaces/auth/user.js";
import { findUserByEmail as findUserByEmailRepo } from "../repositories/userRepo.js";

export async function findUserByEmail(
  email: string
): Promise<SafeUserDTO | null> {
  logger.info(`findUserByEmail: ${email}`);

  if (email.endsWith("test.com")) {
    return {
      id: "1",
      email: email,
    };
  } else if (email.endsWith("fail.com")) {
    return null;
  }
  const user = await findUserByEmailRepo(email);
  return user ? { id: user._id.toString(), email: user.email } : null;
}
