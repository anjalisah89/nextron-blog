/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ap-south-1.graphassets.com"],
  },
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
