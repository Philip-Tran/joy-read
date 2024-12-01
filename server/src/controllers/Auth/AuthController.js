import bcrypt from "bcryptjs";
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
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).send({
        message: "There is no user registered with this email address",
      });
    }

    // Evaluate password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Create JWTs
      const accessToken = jwt.sign(
        { email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10d" }
      );
      const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );

      // Update user with the refresh token in the database
      await prisma.user.update({
        where: { email: user.email },
        data: { refreshToken },
      });

      // Set HTTP-only cookie with the refresh token
      res.cookie("jwt", refreshToken, {
        secure: false, // for development
        httpOnly: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        user: {
          name: user.name,
          email: user.email,
        },
        accessToken,
      });
    } else {
      res.status(401).json({ message: "Password or email is not correct" }); // Unauthorized
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
