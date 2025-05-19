import pdfParse from "pdf-parse";
import Parser from "@postlight/parser";

const getTextFromPdf = (req, res) => {
  if (!req.files && !req.files.pdfFile) {
    console.log("server: no file");
    res.status(400);
    res.end();
  }
  pdfParse(req.files.pdfFile).then((result) => {
    const normalizedTextPraseOne = result.text
      .split(/\r?\n/) // Split by all line breaks
      .reduce((acc, line) => {
        if (acc.length === 0) {
          return [line.trim()]; // Start with the first line
        }

        const lastLine = acc[acc.length - 1];

        if (
          lastLine.endsWith(".") && // Previous line ends with a period
          /^[A-Z]/.test(line.trim()) // Current line starts with an uppercase letter
        ) {
          acc.push(line.trim()); // New paragraph
        } else {
          acc[acc.length - 1] += " " + line.trim(); // Same paragraph
        }

        return acc;
      }, [])
      .join("\n\n"); // Join paragraphs with double newlines

    const normalizedTextPraseTwo = normalizedTextPraseOne
      .split("\n\n") // Split paragraphs
      .map((paragraph) => {
        // Check for uppercase words or "Chapter X" patterns
        // Treat them as single lines
        if (
          /^[A-Z\s]+$/.test(paragraph) ||
          /\bChapter\s+[IVXLCDM0-9]+\b/.test(paragraph)
        ) {
          return paragraph.trim(); // Keep the chapter/uppercase text as a single line
        }
        return paragraph;
      })
      .join("\n\n"); // Join paragraphs back together with double newlines
    // Do what I tell you, handle uppercase exception and chapter here to do

    console.log(normalizedTextPraseTwo);
    res.send(normalizedTextPraseTwo);
  });
};

const getTextFromWeb = async (req, res) => {
  try {
    const { webUrl } = req.body;
    const result = await Parser.parse(webUrl, { contentType: "html" });

    if (!result) {
      console.log("Error, no result from parsing web url");
      return res
        .status(400)
        .json({ message: "Error occur when getting content from web page" });
    }

    return res.status(200).json({
      title: result.title,
      content: result.content,
      wordCount: result.word_count,
    });
  } catch (error) {
    console.log("Error extracting text from webpage:", error.message);
  }
};

export { getTextFromPdf, getTextFromWeb };
