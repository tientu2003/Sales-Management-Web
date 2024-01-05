/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'scontent.fotp8-1.fna.fbcdn.net',
    ],
    // Make ENV
    unoptimized: true,
  },rewrites: async () => {
    return [
    {
        source: '/api/:path*',
        destination:
        process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/api/:path*'
            : '/api/',
    },
    ]
  },
  // experimental: {
  //   appDir: true,
  // },
};

// module.exports = withTM(nextConfig);
module.exports = nextConfig;
