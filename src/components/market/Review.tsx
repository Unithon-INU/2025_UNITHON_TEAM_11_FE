'use client';

import React from 'react';
import Image from 'next/image';
import ReviewList from './RewiewList';
import { RawReview } from '@/types/Review';

type ProductReviewSectionProps = {
  reviews: RawReview[];
  totalCount?: number;
  averageRating?: number;
};



export default function ProductReviewSection({reviews,
  totalCount = 0,
  averageRating = 0,
}: ProductReviewSectionProps) {
  const filledStars = Math.floor(averageRating);
  const emptyStars = 5 - filledStars;

  const reviewImages = reviews.flatMap((r) => r.imageUrls).slice(0, 5);

  const mappedReviews = reviews.map((review, i) => ({
    id: i, // 혹시 서버에서 id 없을 경우 index 사용
    user: review.memberInfo.nickname,
    date: review.createdAt,
    rating: review.rating,
    liked: review.isLiked === true,
    likeCount: review.likeCount,
    option: review.purchaseOption ?? '',
    comment: review.content,
    images: review.imageUrls ?? [],
  }));

  return (
    <div className="py-6 px-5">
      {/* 상단 리뷰 통계 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <div className="text-[15px] font-semibold text-[#222]">리뷰 {reviews.length}개</div>
          <button className="text-[13px] text-[#9A9A9A]">전체보기 &gt;</button>
        </div>
        <div className="flex items-center gap-1 text-[16px] text-[#FFD600]">
          {'★'.repeat(filledStars)}
          <span className="text-[#C2C2C2]">{'★'.repeat(emptyStars)}</span>
          <span className="text-[#222] ml-2 text-[14px]">{averageRating.toFixed(1)} / 5</span>
        </div>
      </div>

      {/* 리뷰 사진 모음 */}
      <div className="flex gap-2 overflow-x-auto mb-4 scrollbar-hide">
        {reviewImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="리뷰사진"
            className="w-20 h-20 object-cover rounded-md border-none"
          />
        ))}
      </div>

      {/* 전체 리뷰 보기 버튼 */}
      <button className="w-full border h-[52px] border-[#E5E5E5] text-[14px] font-medium py-[17.5px] rounded-[500px] mb-6">
        리뷰 전체보기
      </button>

      <ReviewList reviews={mappedReviews} />

      <button className="mt-6 w-full border h-[52px] py-[17.5px] border-[#E5E5E5] text-[14px] font-medium rounded-[500px]">
        리뷰 전체보기
      </button>
    </div>
  );
}
