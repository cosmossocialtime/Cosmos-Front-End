/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'cyclic-wild-red-clam-tie-eu-west-3.s3.eu-west-3.amazonaws.com',
      'cosmos-social-bucket.s3.us-east-2.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
