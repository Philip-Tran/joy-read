import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
} from "../controllers/book.controller.js";
import {
  getTextFromPdf,
  getTextFromWeb,
} from "../controllers/getText.Controller.js";

const router = express.Router();
import senFlowRouter from "../routes/senFlow.route.js";

/*
    |--------------------------------------------------------------------------
    | Book Route
    |--------------------------------------------------------------------------
    */
router.post("/create", createBook);
router.get("/:userId", getAllBooks);
router.get("/:userId/:bookId", getSingleBook);
router.delete("/:id", deleteBook);
router.post("/get-pdf-text", getTextFromPdf);
router.post("/get-web-text", getTextFromWeb);

router.use("/:id/flow", senFlowRouter);

export default router;
