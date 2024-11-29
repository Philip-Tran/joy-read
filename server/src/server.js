import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyparser from "body-parser";

import bookRouter from "./routes/book.route.js";

dotenv.config();

const PORT = process.env.PORT || 8009;
const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Include Authorization
  })
);
app.options("*", cors()); // Preflight requests

app.get("/", (req, res) => {
  res.send("Hello, There");
});

app.post("/test", (req, res) => {
  res.send({ message: "just test post" });
});

app.use("/api/book", bookRouter);

// app.use("/user", userRoute)
// app.use("/post", postRoute)
// app.use("category", categoryRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
