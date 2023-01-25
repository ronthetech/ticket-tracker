/** @type {import("prettier").Config} */
module.exports = {
  bracketSameLine: true,
  endOfLine: "lf",
  printWidth: 80,
  semi: false,
  tabWidth: 2,
  trailingComma: "es5",
  singleQuote: false,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
}
