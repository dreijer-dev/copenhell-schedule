import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'networksites.livenationinternational.com',
        pathname: '/networksites/40bntupx/**',
      },
      {
        hostname: 'media.appmiral.com',
        pathname: '/prod/**',
      },
    ],
  },
}

export default nextConfig
