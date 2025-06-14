import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import chalk from 'chalk';
import path from "path";
import { fileURLToPath } from "url";

import prisma from "../lib/prisma.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import CorsOption from "../config/CorsOption.js";
import { logger } from "../Logs/AppLog.js";
/*
    | APPLICATION ROUTE IMPORT
    */
import bookRouter from "./routes/book.route.js";
import userRoutes from "./routes/user.route.js";
import videoRouter from "./routes/video.route.js";
import authRoutes from "./routes/auth.route.js";

/*
    |--------------------------------------------------------------------------
    | Application middleware config
    |--------------------------------------------------------------------------
    | Change PORT in .env file
    */
const PORT = process.env.PORT || 8009;
const app = express();
dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
// app.use(cors(CorsOption));
// app.options("*", cors(CorsOption)); // Preflight requests
app.use(cors({ origin: ['https://joy-read-next.vercel.app', 'http://localhost:3000'] }))
app.options('*', cors({ origin: '*' }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(logger);

app.use("/storage", express.static(path.join(__dirname, "../storage"))); // server static files in storage directory
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  })
);
/* -------------------------------------------------------------------------- */
/*                                  API ROUTE                                 */
/* -------------------------------------------------------------------------- */
app.use("/api/users", userRoutes);
app.use("/api/book", bookRouter);
app.use("/api/video", videoRouter);
app.use("/auth", authRoutes);

app.get("/health-check", async (req, res) => {
  const bookAmount = await prisma.book.count()
  res.send(`There are total ${bookAmount} books`);
});

/* -------------------Bootstrap------------------ */
app.listen(PORT, () => {
  console.log(chalk.blue(`Server is running on port: ${PORT}`));
});

// Export the app for Vercel to handle the function
export default app;
