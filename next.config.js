const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable styled-components
  compiler: {
    styledComponents: true,
  },
  // Explicitly set the workspace root to silence the warning
  outputFileTracingRoot: path.join(__dirname),
}

module.exports = nextConfig

