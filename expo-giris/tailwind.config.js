module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}', 
    './components/**/*.{js,jsx,ts,tsx}', 
    './global.css', 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [require('nativewind/preset')], 
};
