import postcssImport from "postcss-import"
import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

module.exports = {
  plugins: [postcssImport, tailwind, autoprefixer],
}
