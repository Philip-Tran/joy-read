import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import CorsOption from "../config/CorsOption.js";
import { logger } from "../Logs/AppLog.js";

/*
    |--------------------------------------------------------------------------
    | APPLICATION ROUTE IMPORT
    |--------------------------------------------------------------------------
    */
import bookRouter from "./routes/book.route.js";
import userRoutes from "./routes/user.route.js";

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

/* -------------------Bootrap------------------ */
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
