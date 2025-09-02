import { ISafeUserDTO } from "./user.js";

export interface IRegisteredUserResponse {
  isRegistered: boolean;
}

export interface IRegisterResponse {
  token: string;
  user: ISafeUserDTO;
  message?: string;
}

export interface ILoginResponse {
  token: string;
  user: ISafeUserDTO;
  message?: string;
}
