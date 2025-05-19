import { PrismaClient } from "@prisma/client";
import { createAuthUser } from "../../modules/supabase/Auth/createAuthUser.js";
import { createDbUser } from "../../modules/supabase/Auth/createDbUser.js";

const prisma = new PrismaClient();

export const createNewUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    let authId = createAuthUser(email, password);

    await createDbUser({ auth_id: authId, username, email });
    res.status(201).json({ message: "Register user successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
