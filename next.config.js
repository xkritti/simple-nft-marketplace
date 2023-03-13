/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  env: {
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    MARKET_ADDRESS: process.env.MARKET_ADDRESS,
  },
  ...nextConfig,
};
