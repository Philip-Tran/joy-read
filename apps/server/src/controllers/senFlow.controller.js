import prisma from "../../lib/prisma.js";

/**
 * Controller
 */
const getSenFlow = async (req, res) => {
  const { userId, bookId } = req.params;
  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
      userId,
    },
  });

  if (!book) {
    res
      .status(400)
      .json({ message: "Not authorized or this book was removed exist" });
  }
  try {
    const sens = await prisma.SenFlow.findMany({
      where: {
        bookId: bookId,
      },
    });

    res.json(sens);
  } catch (error) {
    console.log("Error getting senflow for this book", error.message);
    res.status(400).json({ message: "Error getting senflow for this book" });
  }
};

const addSenFlow = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!book) return res.status(400).json({ message: "Book not found" });

    const { frontText, backText } = req.body;

    const newSenFlow = await prisma.SenFlow.create({
      data: {
        frontText,
        backText,
        bookId,
      },
    });
    res.status(201).json({ bookId, sen: newSenFlow });
  } catch (error) {
    console.log("Error add senflow", error.message);
  }
};

export { addSenFlow, getSenFlow };
