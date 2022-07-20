const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "false",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Proxima Nova", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    "require('@tailwindcss/forms')",
    "require('@tailwindcss/aspect-ratio')",
  ],
  safelist: ["bg-indigo-100", "bg-green-200", "bg-red-200", "text-indigo-600"],
};
