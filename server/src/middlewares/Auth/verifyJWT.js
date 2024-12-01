import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.sendStatus(401); // Unauthorized
    }

    // Extract the token
    const token = authHeader.split(" ")[1];
    console.log(`Token received: ${token}`);

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error(`JWT verification error: ${err.message}`);
        return res
          .status(403) // Forbidden
          .json({
            message:
              "You are not authorize to take this action, Please consider login",
          });
      }

      req.user = decoded.email;
      console.log(`Decoded user from token: ${req.user}`);
      next();
    });
  } catch (error) {
    console.error(`Error in verifyJWT middleware: ${error.message}`);
    res.sendStatus(500);
  }
};
