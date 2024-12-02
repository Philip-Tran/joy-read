import express from "express";
import {
  createBook,
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
router.post("/get-pdf-text", getTextFromPdf);

router.use("/:id/flow", senFlowRouter);

export default router;
