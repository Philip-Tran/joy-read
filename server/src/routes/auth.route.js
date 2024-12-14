import {
  loginUser,
  createNewUser,
} from "../controllers/Auth/AuthController.js";

import express from "express";

const router = express.Router();

router.post("/sign-up", createNewUser);
router.post("/login", loginUser);

export default router;
