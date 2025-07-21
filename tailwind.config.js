// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // <- required if you're using app directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
