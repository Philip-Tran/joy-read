import prisma from "../../lib/prisma.js";
import { generateDateNow } from "../../lib/generateDate.js";

import axios from "axios";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Get the current directory name by converting the file URL to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createBook = async (req, res) => {
  try {
    const book = req.body;
    const { title, content, audioUrlOnl, userId } = book;

    if (!title || !content) {
      return res
        .status(404)
        .json({ message: "Please include necessary fields for your book" });
    }

    let fileName = null; // Initialize fileName to null

    try {
      // Download the audio if audioUrlOnl is provided
      if (audioUrlOnl) {
        const response = await axios({
          method: "get",
          url: audioUrlOnl,
          responseType: "stream",
        });

        const sanitizedTitle = title.trim().replace(/\s+/g, "_");
        // Generate a file name for the audio file
        fileName =
          generateDateNow() + "_" + sanitizedTitle + path.extname(audioUrlOnl);
        const filePath = path.join(__dirname, "../../storage/audio", fileName);

        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        // Wait for the download to finish before proceeding
        await new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
        });
      }

      // Create the book in the database, including the audioUrlSer if audioUrlOnl is provided
      const newBook = await prisma.book.create({
        data: {
          userId,
          title,
          content,
          audioUrlOnl,
          audioUrlSer: fileName, // Store fileName if audio was uploaded
        },
      });

      res.send({ message: "New book created successfully", book: newBook });
    } catch (error) {
      console.log("Error processing audio file", error.message);
      res.status(500).json({ message: "Error processing audio in the server" });
    }
  } catch (error) {
    console.log("Error creating book", error.message);
    res.status(500).json({ message: "Error creating book" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId here", userId);
    if (!userId) return res.status(400).json({ message: "Unauthorized" });
    const books = await prisma.book.findMany({
      where: {
        userId,
      },
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!books) {
      return res.json({ message: "You don't have any book. Let create one" });
    }

    res.status(200).json(books);
  } catch (error) {
    console.log("Error getting all books", error.message);
    res.status(404).json({ message: "Error getting all book from the server" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { bookId, userId } = req.params;
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
        userId,
      },
    });

    if (!book) return res.json({ message: "Error, can't not find this book" });

    res.status(200).json(book);
  } catch (error) {
    console.log("Error getting single book", error.message);
    res.status(400).json({ message: "Error getting single book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;

    await prisma.book.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Delete book successfully" });
  } catch (error) {
    console.log("Error getting single book", error.message);
    res.status(400).json({ message: "Error deleting book" });
  }
};

export { createBook, getAllBooks, getSingleBook, deleteBook };
