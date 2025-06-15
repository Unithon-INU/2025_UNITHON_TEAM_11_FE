import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
   distDir: 'output',
   images: {
    unoptimized: true, // ✅ 정적 모드에서 이미지 최적화 비활성화
  },
};

export default nextConfig;
