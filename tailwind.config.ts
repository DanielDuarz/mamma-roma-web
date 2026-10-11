import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mamma Roma palette
        mr: {
          black: "#171919",
          red: "#e3252d",
          green: "#006a34",
          gold: "#d7a53b",
          gray: "#353535",
        },
        // Sette Colli palette
        sc: {
          terracotta: "#bf241e",
          gray: "#353535",
          black: "#171919",
          cream: "#f7eedd",
          brown: "#774b1b",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        'solid-black': '4px 4px 0px 0px #171919',
        'solid-brown': '4px 4px 0px 0px #774b1b',
        'solid-cream': '4px 4px 0px 0px #f7eedd',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleUp: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.35s ease-out forwards",
        scaleUp: "scaleUp 0.25s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
