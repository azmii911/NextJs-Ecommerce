const dev = process.env.NODE_ENV === "production";

export const API_BASE_URL = dev
  ? "http://localhost:3000/api"
  : "https://next-js-ecommerce-one.vercel.app/api";
export const BASE_URL = dev
  ? "http://localhost:3000"
  : "https://next-js-ecommerce-one.vercel.app";
