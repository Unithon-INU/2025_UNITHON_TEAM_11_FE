import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    unoptimized: true, // ✅ 정적 모드에서 이미지 최적화 비활성화
    domains: ['fring-s3.s3.ap-northeast-2.amazonaws.com'],
  },
};

export default nextConfig;
