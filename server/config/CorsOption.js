import allowedOrigins from "./allowedOrigins.js";

const CorsOption = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default CorsOption;
