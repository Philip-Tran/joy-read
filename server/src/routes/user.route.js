import express from "express";

const router = express.Router();

router.post("/create", (req, res) => {
  res.send("Just created a user");
});

export default router;
