/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    MONGODB_URL:"mongodb://localhost/crudapp"
  }
}

module.exports = nextConfig
