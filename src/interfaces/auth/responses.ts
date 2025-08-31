export interface RegisteredUserResponse {
  isRegistered: boolean;
}

export interface LoginResponse {
  token: string;
  message?: string;
}

export interface RegisterResponse {
  token: string;
  message?: string;
}
