import dotenv from "dotenv";
import prisma from "../../../lib/prisma.js";

dotenv.config();

export const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  try {
    // Check if refreshToken exists in the database
    const foundUser = await prisma.user.findUnique({
      where: { refreshToken },
    });

    if (!foundUser) {
      // Clear cookie if no matching user is found
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204); // No content
    }

    // Remove refreshToken from the user in the database
    await prisma.user.update({
      where: { email: foundUser.email },
      data: { refreshToken: null },
    });

    // Clear the cookie
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204); // No content
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
