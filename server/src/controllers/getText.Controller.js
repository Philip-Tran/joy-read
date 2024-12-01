import pdfParse from "pdf-parse";

const getTextFromPdf = (req, res) => {
  if (!req.files && !req.files.pdfFile) {
    console.log("server: no file");
    res.status(400);
    res.end();
  }
  pdfParse(req.files.pdfFile).then((result) => {
    res.send(result.text);
  });
};

export { getTextFromPdf };
