export interface IRegisteredUserResponse {
  isRegistered: boolean;
}

export interface ILoginResponse {
  token: string;
  message?: string;
}

export interface IRegisterResponse {
  token: string;
  message?: string;
}
