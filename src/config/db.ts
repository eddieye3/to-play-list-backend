import mongoose from "mongoose";
import config from "./index.js";
import logger from "../utils/logger.js";

const uri = `mongodb+srv://${config.dbUser}:${config.dbPsw}@${config.dbCluster}/${config.dbName}?retryWrites=true&w=majority&appName=to-play-list-backend`;

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
