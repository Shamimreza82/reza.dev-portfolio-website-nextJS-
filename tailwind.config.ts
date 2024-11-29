import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
	  Oswald: ["Oswald", "serif"],
	  Roboto: ["Roboto", "serif"],
    },
    extend: {
      colors: {
        primaryBg: "bg-slate-950",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
