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
        // child menu
        "blue-green": "#14A3BA",
        "blue-hosta": "#5FC3D5",
        "dull-pink": "#D97BAD",
        "pink-flare": "#E7B8D3",
        lavender: "#A081DB",
        "pale-violet": "#C4AEEA",
        "moonstone-blue": "#6AA8E6",
        "light-cornflower-blue": "#9ACBF6",
      },
    },
  },
  plugins: [require("daisyui")],
};
