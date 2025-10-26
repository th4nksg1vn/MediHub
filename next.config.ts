import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Set Turbopack root to this project folder to avoid Next.js inferring a wrong workspace root
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
