const dev = process.env.NODE_ENV == "production";

export const API_BASE_URL = dev
  ? "http://localhost:3000/api"
  : "https://next-js-ecommercee-five.vercel.app/";
export const BASE_URL = dev
  ? "http://localhost:3000"
  : "https://next-js-ecommercee-five.vercel.app/";
