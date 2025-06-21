'use client';

import React from 'react';
import Image from 'next/image';
import ReviewList from './RecipeReviewList';

const mockReviews = [
  {
    id: 1,
    user: 'dor****',
    date: '25.01.23',
    rating: 4,
    liked: true,
    likeCount: 2,
    option: '단품 계란 30구, 1판',
    comment: '아십니까? 계란을 살아본다더니 여기만한 계란이 없더라구요.^^ 계란은 항상 여기서 시켜먹습니다~ 변함없심쇼.^^',
    images: ['/asset/egg.svg'],
  },
  {
    id: 2,
    user: 'dor****',
    date: '25.01.23',
    rating: 4,
    liked: false,
    likeCount: 2,
    option: '단품 계란 30구, 1판',
    comment: '아십니까? 계란을 살아본다더니 여기만한 계란이 없더라구요.^^ 계란은 항상 여기서 시켜먹습니다~ 변함없심쇼.^^',
    images: ['/asset/egg.svg', '/asset/egg.svg', '/asset/egg.svg'],
  },
  {
    id: 3,
    user: 'dor****',
    date: '25.01.23',
    rating: 4,
    liked: false,
    likeCount: 2,
    option: '단품 계란 30구, 1판',
    comment: '아십니까? 계란을 살아본다더니 여기만한 계란이 없더라구요.^^ 계란은 항상 여기서 시켜먹습니다~ 변함없심쇼.^^',
    images: [],
  },
];

export default function ProductReviewSection() {
  return (
    <div className="py-6 px-5">
      {/* 상단 리뷰 통계 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <div className="text-[15px] font-semibold text-[#222]">리뷰 1,234개</div>
          <button className="text-[13px] text-[#9A9A9A]">전체보기 &gt;</button>
        </div>
        <div className="flex items-center gap-1 text-[16px] text-[#FFD600]">
          {'★'.repeat(4)}<span className="text-[#C2C2C2]">★</span>
          <span className="text-[#222] ml-2 text-[14px]">4.2 / 5</span>
        </div>
      </div>

      {/* 리뷰 사진 모음 */}
      <div className="flex gap-2 overflow-x-auto mb-4 scrollbar-hide">
        {[...Array(5)].map((_, i) => (
          <img
            key={i}
            src="/asset/egg.svg"
            alt="리뷰사진"
            className="w-20 h-20 object-cover rounded-md border-none"
          />
        ))}
      </div>


      <ReviewList reviews={mockReviews} />
  

      {/* 리뷰 전체보기 하단 */}
      <button className="mt-6 w-full border h-[52px] py-[17.5px] border-[#E5E5E5] text-[14px] font-medium rounded-[500px] ">리뷰 전체보기</button>
    </div>
  );
}
