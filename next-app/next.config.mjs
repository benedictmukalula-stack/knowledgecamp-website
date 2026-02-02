/**
 * Minimal Next.js config for a separate app that
 * consumes the shared types and data from ../shared.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
