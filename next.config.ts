import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        'https://networksites.livenationinternational.com/networksites/40bntupx/logo-white-copenhell-2025-600px.png'
      ),
    ],
  },
}

export default nextConfig
