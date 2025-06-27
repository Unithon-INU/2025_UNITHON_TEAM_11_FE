'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ReviewList from './RewiewList';
import FullProdReviewModal from '../review/FullProdReviewModal'; // ✅ 모달 import
import { RawReview } from '@/types/Review';

type ProductReviewSectionProps = {
  reviews: RawReview[];
  totalCount?: number;
  averageRating?: number;
};

export default function ProductReviewSection({
  reviews,
  averageRating = 0,
}: ProductReviewSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 모달 상태 관리

  const filledStars = Math.floor(averageRating);
  const emptyStars = 5 - filledStars;

  const reviewImages = reviews.flatMap((r) => r.imageUrls).slice(0, 5);

  const mappedReviews = reviews.map((review) => ({
    reviewId: review.reviewId,
    user: review.memberInfo.nickname,
    date: review.createdAt,
    rating: review.rating,
    isliked: review.isLiked === true,
    likeCount: review.likeCount,
    option: review.purchaseOption ?? '',
    comment: review.content,
    images: review.imageUrls ?? [],
  }));

  return (
    <>
      <div className="py-6 ">
        {/* 상단 리뷰 통계 */}
        <div className="mb-4 px-5">
          <div className="flex justify-between items-center mb-1">
            <div className="text-[15px] font-semibold text-[#222]">리뷰 {reviews.length}개</div>
            <button
              className="text-[13px] text-[#9A9A9A]"
              onClick={() => setIsModalOpen(true)} // ✅ 모달 열기
            >
              전체보기 &gt;
            </button>
          </div>
          <div className="flex items-center gap-1 text-[16px] text-[#FFD600]">
            {'★'.repeat(filledStars)}
            <span className="text-[#C2C2C2]">{'★'.repeat(emptyStars)}</span>
            <span className="text-[#222] ml-2 text-[14px]">{averageRating.toFixed(1)} / 5</span>
          </div>
        </div>

        {/* 리뷰 사진 모음 */}
        <div className=" px-5 flex gap-2 overflow-x-auto mb-4 scrollbar-hide">
          {reviewImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="리뷰사진"
              className="w-20 h-20 object-cover rounded-md border-none"
            />
          ))}
        </div>


        <div className='px-5'>
          {/* 전체 리뷰 보기 버튼 */}
          <button
            className="w-full border h-[52px] border-[#E5E5E5] text-[14px] font-medium py-[17.5px] rounded-[500px] mb-6"
            onClick={() => setIsModalOpen(true)} // ✅ 모달 열기
          >
            리뷰 전체보기
          </button>
        </div>
        
        <div className=' border-t-8 border-[#F0F0F0]'></div>
        
        <ReviewList reviews={mappedReviews} />

        <div className='px-5'>
          <button
            className="mt-6 w-full border h-[52px] py-[17.5px] border-[#E5E5E5] text-[14px] font-medium rounded-[500px]"
            onClick={() => setIsModalOpen(true)} // ✅ 모달 열기
          >
            리뷰 전체보기
          </button>
        </div>
      </div>

      {/* ✅ FullProdReviewModal 연동 */}
      <FullProdReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reviews={reviews}
        averageRating={averageRating}
      />
    </>
  );
}
