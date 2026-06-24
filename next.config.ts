import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash (used in login page background)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Cloudinary — most common image CDN for Express backends
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      // Vercel Blob storage (if backend uses @vercel/blob)
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      // Backend domain itself (in case images are served directly)
      {
        protocol: 'https',
        hostname: 'real-estate-backend-ecru.vercel.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      // Added for the property images
      {
        protocol: 'https',
        hostname: 'www.nelyvecazizysan.me',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
