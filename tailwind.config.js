/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // dasar
        "pale-blue-lily": "#CFECEC",
        // background
        romance: "#e0f0f5",
        // font
        "dark-teal": "#005052",
        // menu
        topaz: "#13BBAF",
        "pale-teal": "#82CBB2",
        "bluish-cyan": "#1E9AB0",
        "macaw-blue-green": "#43BFC7",
        "thulian-pink": "#DE6FA1",
        "pink-pearl": "#E7ACCF",
        lavender: "#B57EDC",
        "bright-ube": "#D19FE8",
        "dark-pastel-blue": "#779ECB",
        "light-cornflower-blue": "#93CCEA",
      },
    },
  },
  plugins: [require("daisyui")],
};
