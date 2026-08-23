import type { NextConfig } from 'next';
import path from 'path';

const devOrigins = ['localhost', '127.0.0.1'];

if (process.env.NEXT_DEV_HOST) {
  devOrigins.push(process.env.NEXT_DEV_HOST);
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    useTypeScriptCli: true,
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'node_modules')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  allowedDevOrigins: devOrigins,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
