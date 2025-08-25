/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // This is the new, correct way
    autoprefixer: {},
  },
};

export default config;