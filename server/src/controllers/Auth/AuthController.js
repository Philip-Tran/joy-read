import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../../../lib/prisma.js";

dotenv.config();

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Fetch user from the database using Prisma
    const foundUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!foundUser) {
      return res.sendStatus(401); // Unauthorized
    }

    // Evaluate password
    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      // Create JWTs
      const accessToken = jwt.sign(
        { email: foundUser.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign(
        { email: foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );

      // Update user with the refresh token in the database
      await prisma.user.update({
        where: { email: foundUser.email },
        data: { refreshToken },
      });

      // Set HTTP-only cookie with the refresh token
      res.cookie("jwt", refreshToken, {
        // httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    } else {
      res.sendStatus(401); // Unauthorized
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
