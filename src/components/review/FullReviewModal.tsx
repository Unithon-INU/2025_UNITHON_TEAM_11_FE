'use client';

import React, { useState, useEffect } from 'react';
import ReviewList from '../recipe/RecipeReviewList';
import ReviewImgModal from '../review/ReviewImgModal'; // ✅ 추가
import { RawReview } from '@/types/Review';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  reviews: RawReview[];
  totalCount?: number;
  averageRating?: number;
};

export default function FullReviewModal({
  isOpen,
  onClose,
  reviews,
  averageRating = 0
}: Props) {
  const [isImgModalOpen, setIsImgModalOpen] = useState(false); // ✅ 이미지 모달 상태

  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filledStars = Math.floor(averageRating);
  const emptyStars = 5 - filledStars;

  const reviewImages = reviews.flatMap((r) => r.imageUrls).filter(Boolean); // ✅ null 제거 안전 처리

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
    profileImage: review.memberInfo.imageUrl
  }));

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-white z-50 flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-[18px] font-semibold">리뷰</h2>
          <button className="text-[20px]" onClick={onClose}>✕</button>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto pt-4 pb-[100px]">
          {/* 상단 리뷰 통계 */}
          <div className="mb-4 flex flex-col items-center px-4">
            <div className="flex items-center gap-1 text-[28px] text-[#FFD600]">
              {'★'.repeat(filledStars)}
              <span className="text-[#C2C2C2]">{'★'.repeat(emptyStars)}</span>
            </div>
            <div className="text-[#222] ml-2 text-[20px]">
              {averageRating.toFixed(1)} <span className='text-[#9F9F9F]'>/ 5</span>
            </div>

            <div className="flex justify-between items-center mb-1 w-full mt-4">
              <div className="text-[18px] font-semibold text-[#222]">
                사진&동영상 <span className='text-[#9F9F9F]'>({reviewImages.length})</span>
              </div>
              <button
                className="text-[13px] text-[#9A9A9A]"
                onClick={() => setIsImgModalOpen(true)} // ✅ 모달 오픈
              >
                더보기 &gt;
              </button>
            </div>
          </div>

          {/* 리뷰 사진 모음 */}
          <div className="flex gap-2 overflow-x-auto mb-4 scrollbar-hide px-4">
            {reviewImages.slice(0, 4).map((src, i) => (
              <img
                key={i}
                src={src}
                alt="리뷰사진"
                className="w-20 h-20 object-cover rounded-md border-none"
              />
            ))}
          </div>

          <div className='border-t-8 border-[#F0F0F0] mb-4'></div>

          <div className="flex justify-between items-center mb-1 w-full px-4">
            <div className="text-[18px] font-semibold text-[#222]">
              리뷰 <span className='text-[#9F9F9F]'>({reviews.length})</span>
            </div>
          </div>

          <ReviewList reviews={mappedReviews} />
        </div>
      </div>

      {/* ✅ ReviewImgModal 연동 */}
      <ReviewImgModal
        isOpen={isImgModalOpen}
        onClose={() => setIsImgModalOpen(false)}
        images={reviewImages}
      />
    </>
  );
}
