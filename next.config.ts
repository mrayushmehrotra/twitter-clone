import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "twitter-clone-dev.s3.ap-south-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
