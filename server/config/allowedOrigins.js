const productionUrl =
  process.env.CLIENT_URL || "https://joyread-tranquyet.vercel.app";

const allowedOrigins = [
  productionUrl,
  "https://joyread-tranquyet.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
];

export default allowedOrigins;
