import { createAuthUser } from "../../modules/supabase/Auth/createAuthUser.js";
import { createDbUser } from "../../modules/supabase/Auth/createDbUser.js";
import dotenv from "dotenv";
import prisma from "../../../lib/prisma.js";
import { authLogin } from "../../modules/supabase/Auth/authLogin.js";

dotenv.config();

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const data = await authLogin(email, password);

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const createNewUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    let authId = await createAuthUser(email, password);

    await createDbUser(authId, email, username);
    res
      .status(201)
      .json({
        message:
          "Register user successfully. Please check your email to verify your account",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
