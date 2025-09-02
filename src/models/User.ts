import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";
import { Role } from "../interfaces/auth/user.js";
import { EMAIL_REGEX } from "../constants/index.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      match: [EMAIL_REGEX, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: Role,
      default: Role.USER,
    },
    profileImage: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User>;
export const UserModel = model<User>("User", userSchema);
