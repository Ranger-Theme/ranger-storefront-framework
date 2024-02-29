const nextConfig = require("@ranger/nextjs-config");

const pkg = require("./package.json");

/** @type {import('next').NextConfig} */
module.exports = nextConfig({
  pkg,
  dirname: process.cwd(),
  timestamp: new Date().getTime(),
  transpilePackages: ["@ranger/ui-theme"],
});
