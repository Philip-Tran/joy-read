import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use /tmp/logs for compatibility with Vercel (read-only file system)
const getLogDir = () => {
  // Use '/tmp/logs' on Vercel or fallback to local 'logs' during local dev
  return process.env.VERCEL ? "/tmp/logs" : path.join(__dirname, "..", "logs");
};

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    const logDir = getLogDir();

    // Ensure log directory exists
    if (!fs.existsSync(logDir)) {
      await fsPromises.mkdir(logDir, { recursive: true });
    }

    // Write the log
    await fsPromises.appendFile(path.join(logDir, logName), logItem);
  } catch (err) {
    console.error("Logging failed:", err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};

export { logger, logEvents };
