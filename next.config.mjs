/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['image.cnbcfm.com'],
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
        ],
      }
};

export default nextConfig;
