const productionUrl =
  process.env.CLIENT_URL || "https://joyread-tranquyet.vercel.app";

const allowedOrigins = [
  productionUrl,
  "https://joyread-tranquyet.vercel.app",
  "https://joy-read.philtranwp.site",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "https://joy-read-next.vercel.app/"
];

export default allowedOrigins;
