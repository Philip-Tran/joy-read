import supabase from "../../lib/supabaseClient";
import prisma from "../../lib/prisma.js";

const authenticateUser = async (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Extract the token (assuming Bearer token)
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error("Fail to get supabase auth user: ", error);
      res.status(401).json({ message: "Unauthorized" });
    }

    const authId = data.User.auth_id;
    const user = await prisma.user.find({
      where: {
        auth_id: authId,
      },
    });
    // Attach user to the request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token", message: "Unauthorized" });
  }
};

export { authenticateUser };
