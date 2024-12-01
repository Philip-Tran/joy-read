import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Get the current directory name by converting the file URL to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import CorsOption from "../config/CorsOption.js";
import { logger } from "../Logs/AppLog.js";

/* 
/ Multer file upload config
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../storage/audio"); // The folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

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
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors(CorsOption));
app.options("*", cors()); // Preflight requests

/* -------------------------------------------------------------------------- */
/*                                  API ROUTE                                 */
/* -------------------------------------------------------------------------- */
app.get("/", (req, res) => {
  res.send("Hello, There");
});

app.use("/api/users", userRoutes);

app.use("/api/book", bookRouter);

// app.use("/user", userRoute)
// app.use("/post", postRoute)
// app.use("category", categoryRoute)

app.post("/upload-audio", async (req, res) => {
  const { audioUrl } = req.body;

  if (!audioUrl) {
    return res.status(404).json({ message: "Audio url not found" });
  }

  try {
    // Download the audio
    const response = await axios({
      method: "get",
      url: audioUrl,
      responseType: "stream",
    });

    const fileName = Date.now() + path.extname(audioUrl);
    const filePath = path.join(__dirname, "../storage/audio", fileName);

    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    writer.on("finish", () => {
      res
        .status(200)
        .json({ message: "Audio file downloaded successfully", filePath });
    });

    writer.on("error", (err) => {
      res
        .status(500)
        .json({ error: "Failed to save the audio file", details: err.message });
    });
  } catch (error) {
    console.log("Error processing audio file", error.message);
    res.status(404).json({ message: "Error processing audio in the server" });
  }
});

/* -------------------Bootrap------------------ */
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
