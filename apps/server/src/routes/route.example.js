import express from "express";

/**
 * Import route logic
 */
import createBook from "../controllers/book.controller.js";

//
const router = express.Router();
/*
    |--------------------------------------------------------------------------
    | Define route
    |--------------------------------------------------------------------------
    */

router.post("/create", createBook);

export default router;
