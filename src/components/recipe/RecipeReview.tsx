'use client';

import React from 'react';
import Image from 'next/image';
import ReviewList from './RecipeReviewList';
import { RawReview } from '@/types/Review';

type RecipeReviewSectionProps = {
  reviews: RawReview[];
  totalCount?: number;
  averageRating?: number;
};

export default function RecipetReviewSection({
  reviews,
  totalCount = 0,
  averageRating = 0,
}: RecipeReviewSectionProps) {
  
  return (
    <div className="py-6 px-5">
      {/* 상단 리뷰 통계 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <div className="text-[15px] font-semibold text-[#222]">
            리뷰 {totalCount.toLocaleString()}개
          </div>
          <button className="text-[13px] text-[#9A9A9A]">전체보기 &gt;</button>
        </div>
        <div className="flex items-center gap-1 text-[16px] text-[#FFD600]">
          {'★'.repeat(Math.floor(averageRating))}
          {'★'.repeat(5 - Math.floor(averageRating)).replace(/★/g, (
            <span key={Math.random()} className="text-[#C2C2C2]">★</span>
          ) as unknown as string)}
          <span className="text-[#222] ml-2 text-[14px]">
            {averageRating.toFixed(1)} / 5
          </span>
        </div>
      </div>

      {/* 리뷰 사진 모음 */}
      <div className="flex gap-2 overflow-x-auto mb-4 scrollbar-hide">
        {reviews
          .flatMap((r) => r.imageUrls)
          .slice(0, 5)
          .map((url, i) => (
            <img
              key={i}
              src={url}
              alt="리뷰사진"
              className="w-20 h-20 object-cover rounded-md border-none"
            />
          ))}
      </div>

      <ReviewList reviews={reviews} />

      {/* 리뷰 전체보기 하단 */}
      <button className="mt-6 w-full border h-[52px] py-[17.5px] border-[#E5E5E5] text-[14px] font-medium rounded-[500px]">
        리뷰 전체보기
      </button>
    </div>
  );
}
