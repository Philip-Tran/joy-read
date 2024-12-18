import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

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
app.use(logger);
app.use("/storage", express.static(path.join(__dirname, "../storage"))); // server static files in storage directory
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true, limit: "100mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors(CorsOption));
app.options("*", cors()); // Preflight requests

/* -------------------------------------------------------------------------- */
/*                                  API ROUTE                                 */
/* -------------------------------------------------------------------------- */
app.use("/api/users", userRoutes);
app.use("/api/book", bookRouter);
app.use("/api/video", videoRouter);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello There");
});
/* -------------------Bootrap------------------ */
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });

// Export the app for Vercel to handle the function
export default app;
