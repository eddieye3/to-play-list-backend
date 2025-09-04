export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface SafeUserDTO {
  id: string;
  email: string;
  role: Role;
}

export interface UserDTO {
  id: string;
  email: string;
  password: string; // Hashed password
  role: Role;
  profileImage?: string; // Optional profile image URL
  isEmailVerified: boolean;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}
