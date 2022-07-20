const dev = process.env.NODE_ENV !== "production";

export const API_BASE_URL = dev
  ? "http://localhost:3000/api"
  : "https://your_deployment.server.com";
export const BASE_URL = dev
  ? "http://localhost:3000"
  : "https://your_deployment.server.com";
