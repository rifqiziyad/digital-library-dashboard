import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/books-lending",
      },
    ];
  },
};

export default nextConfig;
