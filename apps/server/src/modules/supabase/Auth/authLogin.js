import { supabaseCli } from "../init.js";

export const authLogin = async (email, password) => {
  try {
    const { data, error } = await supabaseCli.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.log("Error login user: ", error.message);
    throw error;
  }
};
