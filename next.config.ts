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
};

export default nextConfig;
