import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import prisma from "../../../lib/prisma.js";
dotenv.config();

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
  const refreshToken = cookies.jwt;

  try {
    // Find the user by the refreshToken in the database
    const foundUser = await prisma.user.findUnique({
      where: { refreshToken },
    });

    if (!foundUser) return res.sendStatus(403); // Forbidden

    // Verify the JWT
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.email !== decoded.email) {
          return res
            .status(403) // Forbidden
            .json({
              message:
                "You are unauthorized to make this action. Please consider login and try again",
            });
        }

        // Generate a new access token
        const accessToken = jwt.sign(
          { email: decoded.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );

        res.json({ accessToken });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
