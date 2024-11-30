import express from "express";

const router = express.Router();

import { verifyJWT } from "../middlewares/Auth/verifyJWT.js";
import { handleLogin } from "../controllers/Auth/AuthController.js";
import { createNewUser } from "../controllers/Auth/RegisterController.js";
import { handleLogout } from "../controllers/Auth/LogoutController.js";
import { handleRefreshToken } from "../controllers/Auth/RefreshTokenController.js";
import prisma from "../../lib/prisma.js";

router.post("/login", handleLogin);
router.post("/create", createNewUser);
router.get("/logout", handleLogout);
router.get("/", handleRefreshToken);
router.get("/profile", verifyJWT, async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.user,
      },
    });
    console.log(`form profile route: User: ${user}`);

    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.json("Error: getting user profile");
  }
});

export default router;
