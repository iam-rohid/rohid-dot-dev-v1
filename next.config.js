/** @type {import('next').NextConfig} */
const withMarkdoc = require("@markdoc/next.js");

module.exports = withMarkdoc(/* options */)({
  pageExtensions: ["tsx", "jsx", "md"],
  reactStrictMode: true,
});
