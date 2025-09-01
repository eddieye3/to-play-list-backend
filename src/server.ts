import { config } from "./config/index.js";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import logger from "./utils/logger.js";

const PORT = config.port;

connectDB();

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
