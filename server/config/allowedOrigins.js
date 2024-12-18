const productionUrl = process.env.CLIENT_URL;

const allowedOrigins = [
  productionUrl,
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
];

export default allowedOrigins;
