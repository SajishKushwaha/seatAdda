/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [],

  theme: {
    extend: {
      backgroundImage: {
        hero: "url('../src/assets/bus-banner.jpg')",
      },
    },
    colors: {
      primarycolors: {
        textcolor: "#666769",
        btncolor: "#ecc94b",
        red: "#FD5056",
        white: "#FFFFFF",
        black: "#000000",
        gray: "rgb(209 213 219)",
        green: "rgb(59, 148, 58)",
        skyblue: "rgb(59 130 246)",
        blue: "rgb(30 58 138)",
        bg_sky: "rgb(238 242 255)",
        gray_200: "rgb(229 231 235)",

        // ...
      },
      secondary: "#ecc94b",
      // ...
    },
  },
};
