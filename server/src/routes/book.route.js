import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
} from "../controllers/book.controller.js";
import { getTextFromPdf } from "../controllers/getText.Controller.js";

import { verifyJWT } from "../middlewares/Auth/verifyJWT.js";

const router = express.Router();
import senFlowRouter from "../routes/senFlow.route.js";

/*
    |--------------------------------------------------------------------------
    | Book Route
    |--------------------------------------------------------------------------
    */
router.post("/create", createBook);
router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.delete("/:id", deleteBook);
router.post("/get-pdf-text", getTextFromPdf);

router.use("/:id/flow", senFlowRouter);

export default router;
