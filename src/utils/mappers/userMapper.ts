import { UserDocument } from "../../models/user.js";
import { SafeUserDTO, UserDTO } from "../../interfaces/auth/user.js";

export function toDTO(user: UserDocument): UserDTO {
  return {
    id: user._id.toString(),
    email: user.email,
    password: user.password,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function toSafeDTO(user: UserDocument): SafeUserDTO {
  return {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };
}
