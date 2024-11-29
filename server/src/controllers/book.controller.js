import prisma from "../../lib/prisma.js";

const createBook = async (req, res) => {
  try {
    const book = req.body;

    const { title, content } = book;

    const newBook = await prisma.book.create({
      data: {
        title,
        content,
      },
    });
    console.log(title, content, newBook);

    res.send(newBook);
  } catch (error) {
    console.log("Error creating book", error.message);
  }
};

export { createBook };
