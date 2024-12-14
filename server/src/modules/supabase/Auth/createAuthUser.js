import { supabaseCli } from "../init.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createAuthUser = async (email, password) => {
  console.log(email, password);
  try {
    const { data, error } = await supabaseCli.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return data.user.id;
  } catch (error) {
    console.error(
      "Error occur when creating user at createAuthUser: ",
      error.message
    );
    throw error;
  }
};
