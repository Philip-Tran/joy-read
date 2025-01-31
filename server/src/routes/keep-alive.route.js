import express from "express";
import prisma from "../../lib/prisma.js";

/**
 * Import route logic
 */ //
const router = express.Router();
/*
    |--------------------------------------------------------------------------
    | Define route
    |--------------------------------------------------------------------------
    */

router.get("/", async (req, res) => {
  try {
    const page = await prisma.pages.findUnique({
      where: {
        id: 1,
      },
    });
    res.send(page);
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
