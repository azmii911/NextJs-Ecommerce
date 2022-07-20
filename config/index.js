const dev = process.env.NODE_ENV === "production";

export const API_BASE_URL = dev
  ? "https://next-js-ecommerce-ivory.vercel.app/api"
  : "https://next-js-ecommerce-ivory.vercel.app/";
export const BASE_URL = dev
  ? "http://localhost:3000"
  : "https://next-js-ecommerce-ivory.vercel.app/";
