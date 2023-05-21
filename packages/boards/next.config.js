/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  images: {
    domains: ['daybreakhr.s3.amazonaws.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
