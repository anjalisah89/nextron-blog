/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ap-south-1.graphassets.com",
      },
    ],
  },
};

export default nextConfig;
