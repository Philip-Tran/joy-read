import express from "express";
import { createBook, getAllBooks } from "../controllers/book.controller.js";
import { getTextFromPdf } from "../controllers/getText.Controller.js";

import { verifyJWT } from "../middlewares/Auth/verifyJWT.js";

const router = express.Router();

/*
    |--------------------------------------------------------------------------
    | Book Route
    |--------------------------------------------------------------------------
    */
router.post("/create", createBook);
router.get("/get", getAllBooks);
router.post("/get-pdf-text", getTextFromPdf);

export default router;
