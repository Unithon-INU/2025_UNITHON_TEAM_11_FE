'use client';

import React, { useState, useEffect } from 'react';
import LikeButton from '../LikeButton';
import { checkAuthAndRedirect } from '@/utils/checkAuthAndRedirect';
import { PostReviewLike } from '@/api/like/postReviewLike';

export type Review = {
  reviewId: number;
  user: string;
  date: string;
  rating: number;
  isliked: boolean;
  likeCount: number;
  option: string;
  comment: string;
  images: string[];
  profileImage?: string;
};

type Props = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: Props) {
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

  const requireAuth = checkAuthAndRedirect();

  useEffect(() => {
    const initialLikes = Object.fromEntries(
      reviews.map((p) => [p.reviewId, p.isliked])
    );
    const initialCounts = Object.fromEntries(
      reviews.map((p) => [p.reviewId, p.likeCount])
    );

    setLikes((prev) => {
      const same = Object.entries(initialLikes).every(
        ([id, liked]) => prev[+id] === liked
      );
      return same ? prev : initialLikes;
    });

    setLikeCounts((prev) => {
      const same = Object.entries(initialCounts).every(
        ([id, count]) => prev[+id] === count
      );
      return same ? prev : initialCounts;
    });
  }, [reviews]);

  const toggleLike = async (reviewId: number) => {
    if (!requireAuth()) return;

    try {
      await PostReviewLike(reviewId); // ✅ API 호출

      setLikes((prev) => ({
        ...prev,
        [reviewId]: !prev[reviewId],
      }));

      setLikeCounts((prev) => ({
        ...prev,
        [reviewId]: prev[reviewId] + (likes[reviewId] ? -1 : 1),
      }));
    } catch (error) {
      // 롤백
      setLikes((prev) => ({
        ...prev,
        [reviewId]: !prev[reviewId],
      }));

      setLikeCounts((prev) => ({
        ...prev,
        [reviewId]: prev[reviewId] + (likes[reviewId] ? -1 : 1),
      }));

      console.error('좋아요 요청 실패:', error);
    }
  };

  return (
    <div>
      {reviews.map((review) => (
        <div
          key={review.reviewId}
          className="py-6 bg-white"
        >
          <div className="px-5">
            {/* 유저 정보 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <img
                  src={review.profileImage || '/asset/addProfile.svg'}
                  alt="프로필"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col text-sm">
                  <div className="text-[16px]">
                    {'★'.repeat(review.rating)
                      .split('')
                      .map((_, i) => (
                        <span key={`filled-${i}`} className="text-[#FFD600]">
                          ★
                        </span>
                      ))}
                    {'★'.repeat(5 - review.rating)
                      .split('')
                      .map((_, i) => (
                        <span key={`gray-${i}`} className="text-[#D9D9D9]">
                          ★
                        </span>
                      ))}
                  </div>

                  <div className="flex gap-2">
                    <span className="font-regular text-[#9F9F9F]">
                      {review.user}
                    </span>
                    <span className="text-[#9F9F9F]">{review.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative mt-8 ml-9">
                  <LikeButton
                    liked={likes[review.reviewId]}
                    onClick={() => toggleLike(review.reviewId)}
                  />
                </div>
                <div className="text-[12px] mt-[-5px] text-[#9F9F9F]">
                  {likeCounts[review.reviewId] ?? review.likeCount}
                </div>
              </div>
            </div>

            {/* 이미지 */}
            {review.images?.length > 0 && (
              <div className="flex gap-2 mb-2">
                {review.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="리뷰 이미지"
                    className="w-20 h-20 rounded-md object-cover border-none"
                  />
                ))}
              </div>
            )}

            {/* 옵션 및 댓글 */}
           
            <p className="text-[14px] text-[#333] whitespace-pre-wrap leading-[1.5]">
              {review.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
