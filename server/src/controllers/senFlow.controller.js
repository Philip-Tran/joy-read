import prisma from "../../lib/prisma.js";

/**
 * Controller
 */
const getSenFlow = async (req, res) => {
  const { id } = req.params;
  try {
    const sens = await prisma.SenFlow.findMany({
      where: {
        bookId: id,
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
    const { id } = req.params;
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    });
    if (!book) return res.status(400).json({ message: "Book not found" });

    const { frontText, backText } = req.body;

    const senFlow = await prisma.SenFlow.create({
      data: {
        frontText,
        backText,
        bookId: id,
      },
    });
    res.json({ bookId: id, sen: senFlow });
  } catch (error) {
    console.log("Error get senflow", error.message);
  }
};

export { addSenFlow, getSenFlow };
