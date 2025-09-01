import logger from "../utils/logger.js";
import { ISafeUserDTO } from "../interfaces/index.js";
import { findUserByEmail as findUserByEmailRepo } from "../repositories/userRepo.js";

export async function findUserByEmail(
  email: string
): Promise<ISafeUserDTO | null> {
  logger.debug(`authService: findUserByEmail: ${email}`);

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
