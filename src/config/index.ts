import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "development";

const envFile = ".env." + env;

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const config = {
  env: env,
  port: getRequiredEnv("PORT"),
  jwtSecret: getRequiredEnv("JWT_SECRET"),
  corsOrigin: getRequiredEnv("CORS_ORIGIN"),
  dbUser: getRequiredEnv("MONGODB_USER"),
  dbPsw: getRequiredEnv("MONGODB_PSW"),
  dbCluster: getRequiredEnv("MONGODB_CLUSTER"),
  dbName: getRequiredEnv("MONGODB_DB"),
  // Add other env variables as needed
};

export default config;
