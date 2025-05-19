import allowedOrigins from "./allowedOrigins.js";

const CorsOption = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default CorsOption;
