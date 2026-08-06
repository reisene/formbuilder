import type { NextConfig } from 'next';
import path from 'path';

const localhost = process.env.NEXT_DEV_HOST || 'localhost';

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
  allowedDevOrigins: [localhost],
};

export default nextConfig;
