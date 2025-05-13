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
      'cosmos-social-ong-volunteer-bucket.s3.amazonaws.com',
      'thumbs.dreamstime.com',
    ],
  },
}

module.exports = nextConfig
