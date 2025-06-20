'use client';

import React, { useState } from 'react';
import LikeButton from '../LikeButton';

export type Review = {
  id: number;
  user: string;
  date: string;
  rating: number;
  liked: boolean;
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
  const [likes, setLikes] = useState<Record<number, boolean>>(
    Object.fromEntries(reviews.map((r) => [r.id, r.liked]))
  );

  const toggleLike = (id: number) => {
    setLikes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="">
      {reviews.map((review) => (
        <div key={review.id} className="px-3 py-6 border-t-8 border-[#F0F0F0]  bg-white">
          {/* 유저 정보 */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 ">
              <img
                src={review.profileImage || '/asset/addProfile.svg'}
                alt="프로필"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col text-sm">
                <div className="text-[13px]">
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
                  <span className="font-regular text-[#9F9F9F]">{review.user}</span>
                  <span className="text-[#9F9F9F]">{review.date}</span>
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
          {review.images.length > 0 && (
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
          <div className='flex flex-row items-center gap-8 my-4'>
            <div className="text-[13px] text-[#9F9F9F] ">옵션</div>
            <div className="text-[14px] font-semibold text-[#222]">{review.option}</div>
          </div>
          <p className="text-[14px] text-[#333] whitespace-pre-wrap leading-[1.5]">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
}
