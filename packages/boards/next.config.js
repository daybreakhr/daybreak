/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['daybreakhr.s3.amazonaws.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
