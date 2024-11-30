import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNewUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Check for duplicate email in the database
    const duplicate = await prisma.user.findUnique({
      where: { email },
    });

    if (duplicate) {
      return res.sendStatus(409); // Conflict
    }

    // Encrypt the password
    const hashedpassword = await bcrypt.hash(password, 10);

    // Store the new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedpassword,
        name: "quyet",
      },
    });

    res.status(201).json({ success: `New user ${newUser.email} created!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
