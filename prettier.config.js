/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^@/styles/(.*)$",
    "",
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "",
    "^@/components/(.*)$",
    "^@/components/ui/(.*)$",
    "",
    "^@/app/(.*)$",
    "^@/integrations/(.*)$",
    "",
    "^types$",
    "^@/types/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.4",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
}