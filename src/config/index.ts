import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "development";

const envFile = ".env." + env;

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const config = {
  env: env,
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || "",
  jwtSecret: process.env.JWT_SECRET || "",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  // Add other env variables as needed
};
