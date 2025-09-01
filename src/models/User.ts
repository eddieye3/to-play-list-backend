import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema({
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
});

type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User>;
export const UserModel = model<User>("User", userSchema);
