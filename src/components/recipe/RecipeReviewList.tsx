'use client';

import React, { useState, useEffect } from 'react';
import LikeButton from '../LikeButton';
import { RawReview } from '@/types/Review';
import { checkAuthAndRedirect } from '@/utils/checkAuthAndRedirect';
import { PostReviewLike } from '@/api/like/postReviewLike';

type Props = {
  reviews: RawReview[];
};

export default function ReviewList({ reviews }: Props) {
  const [likes, setLikes] = useState<Record<number, boolean>>({});

  useEffect(() => {
  // 현재 상태와 비교해 동일한 경우 setLikes 생략
  const initialLikes = Object.fromEntries(reviews.map((p) => [p.id, p.isLiked === false]));
  
  setLikes((prev) => {
    const same = Object.entries(initialLikes).every(
      ([id, liked]) => prev[+id] === liked
    );
    return same ? prev : initialLikes;
  });
}, [reviews]);

  const toggleLike = async (id: number) => {
    if (!checkAuthAndRedirect()) return;

    try {
      await PostReviewLike(id); // ✅ API 호출// UI optimistic update
      setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
    } catch (error) {
      // 요청 실패 시 상태 롤백
      setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
      console.error('좋아요 요청 실패:', error);
    }
  };

  return (
    <div className="">
      {reviews.map((review) => (
        <div key={review.id} className="py-6 border-t-8 border-[#F0F0F0]  bg-white">
          <div className='px-4'>
            {/* 유저 정보 */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 ">
                <img
                    src={review.memberInfo.imageUrl || '/asset/addProfile.svg'}
                    alt="프로필"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col text-sm">
                    <div className="text-[16px]">
                        {'★'.repeat(review.rating)
                            .split('')
                            .map((_, i) => (
                            <span key={`filled-${i}`} className="text-[#FFD600]">★</span>
                            ))}
                        {'★'.repeat(5 - review.rating)
                            .split('')
                            .map((_, i) => (
                            <span key={`gray-${i}`} className="text-[#D9D9D9]">★</span>
                            ))}
                        </div>

                    <div className="flex gap-2">
                    <span className="font-regular text-[#9F9F9F]">{review.memberInfo.nickname}</span>
                    <span className="text-[#9F9F9F]">{review.createdAt}</span>
                    </div>
                </div>
                </div>
                <div className="flex flex-col items-center ">
                    <div className="relative mt-8 ml-9 ">
                    <LikeButton liked={likes[review.id]} onClick={() => toggleLike(review.id)} />
                    </div>
                        <div className="text-[12px] mt-[-5px] text-[#9F9F9F]">{review.likeCount}</div>
                </div>
            </div>

            {/* 이미지 */}
            {review.imageUrls.length > 0 && (
                <div className="flex gap-2 mb-2">
                {review.imageUrls.map((img, i) => (
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
                {review.content}
            </p>
            </div>
        </div>
      ))}
    </div>
  );
}
