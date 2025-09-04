import { SafeUserDTO } from "./user.js";

export interface RegisteredUserResponse {
  isRegistered: boolean;
}

export interface RegisterResponse {
  token: string;
  user: SafeUserDTO;
  message?: string;
}

export interface LoginResponse {
  token: string;
  user: SafeUserDTO;
  message?: string;
}
