import express from "express";
import { PrismaClient } from "@prisma/client";

import { createBook } from "../controllers/book.controller.js";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/create", createBook);

export default router;
