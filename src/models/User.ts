import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User>;
export const User = model<User>("User", userSchema); // returns HydratedDocument<User> on queries
