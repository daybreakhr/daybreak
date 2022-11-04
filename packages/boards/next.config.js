const withAntdLess = require('next-plugin-antd-less')

/** @type {import('next').NextConfig} */
const nextConfig = withAntdLess({
  modifyVars: {
    '@primary-color': '#9155fd',
  },
  experimental: {
    externalDir: true,
  },
  images: {
    domains: ['daybreakhr.s3.amazonaws.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
})

module.exports = nextConfig
