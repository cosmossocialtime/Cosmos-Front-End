/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['cosmos-social-bucket.s3.us-east-2.amazonaws.com'],
  },
}

module.exports = nextConfig
