import express from "express";

/**
 * Import route logic
 */
import { getVideoTranscript } from "../controllers/video.controller.js";

//
const router = express.Router();
/*
    |--------------------------------------------------------------------------
    | Define route
    |--------------------------------------------------------------------------
    */

router.post("/get-transcript", getVideoTranscript);

export default router;
