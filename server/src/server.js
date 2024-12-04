import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
// import { YoutubeTranscript } from "youtube-transcript";
// import { YtTranscript } from "yt-transcript";

import CorsOption from "../config/CorsOption.js";
import { logger } from "../Logs/AppLog.js";
/*
    | APPLICATION ROUTE IMPORT
    */
import bookRouter from "./routes/book.route.js";
import userRoutes from "./routes/user.route.js";
import videoRouter from "./routes/video.route.js";

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
app.use("/api/video", videoRouter);
//-----------test pdf extract----------
// import { PDFExtract } from "pdf.js-extract";

// const pdfExtract = new PDFExtract();
// const options = { normalizeWhiteSpace: false, disableCombineTextItems: true };

// pdfExtract.extract("sample.pdf", options, (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
//   console.log(data.pages[0].content[0].str);

//   // Iterate over pages and content to print text
//   data.pages.forEach((page, pageIndex) => {
//     console.log(`Page ${pageIndex + 1}:`);
//     page.content.forEach((item) => {
//       console.log(item.str); // Print the extracted text
//     });
//   });
// });

//-----------test fetch transcript----------
// async function fetchTranslatedTranscript(videoId, langCode) {
//   try {
//     const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
//       lang: langCode,
//     });
//     console.log(transcript);
//   } catch (error) {
//     console.error("Error fetching translated transcript:", error);
//   }
// }

// fetchTranslatedTranscript("s5QOWbFZnZ8", "en");

// const ytTranscript = new YtTranscript({ videoId: "dQw4w9WgXcQ" });

// ytTranscript.listAllTranscripts().then((transcript) => {
//   console.log(transcript);
// });

// ytTranscript.getTranscript().then((transcript) => {
//   console.log(transcript);
// });

/* -------------------Bootrap------------------ */
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
