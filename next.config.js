/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["shark-app-dcfyj.ondigitalocean.app"]
  },
}

module.exports = nextConfig
