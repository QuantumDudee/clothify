/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure output is properly configured
  output: 'standalone',
  // Add proper trailing slashes configuration
  trailingSlash: false,
};

module.exports = nextConfig; 