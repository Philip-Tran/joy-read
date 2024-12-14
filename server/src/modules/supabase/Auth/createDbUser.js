import { supabaseCli } from "../init.js";
import prisma from "../../../../lib/prisma.js";

export const createDbUser = async (auth_id, email, username) => {
  try {
    const result = await prisma.user.create({
      data: {
        email,
        auth_id,
        username,
      },
    });

    if (!result) console.log("Error");
  } catch (error) {
    console.error("Error occur when creating user at createDbUser: ", error);
    throw error;
  }
};
