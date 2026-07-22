/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      { source: '/cart', destination: '/store', permanent: true },
      { source: '/checkout', destination: '/store', permanent: true },
      { source: '/order-confirmation', destination: '/store', permanent: true },
    ];
  },
};

module.exports = nextConfig;
