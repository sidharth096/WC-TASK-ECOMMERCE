import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
     remotePatterns: [
      {
        protocol: "https",        // or "http"
        hostname: "img.freepik.com",
        pathname: "/**",          // allow all paths
      },
    ],
  },
};

export default nextConfig;
