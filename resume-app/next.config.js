/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    MONGODB_URL:"mongodb://localhost/resumeapp"
  }
}

module.exports = nextConfig
