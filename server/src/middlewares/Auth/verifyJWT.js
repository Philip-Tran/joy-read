import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyJWT = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) return res.sendStatus(401); // Unauthorized

  console.log(authHeader); // Bearer token
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden (invalid token)
    req.user = decoded.email; // Using email instead of username
    console.log(`Form verify token ${req.user}`);
    next();
  });
};
