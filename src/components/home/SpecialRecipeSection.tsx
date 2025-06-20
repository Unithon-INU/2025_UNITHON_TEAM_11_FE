'use client';

import React from 'react';
import { LuClock3 } from 'react-icons/lu';
import { AiFillStar } from 'react-icons/ai';

export type SpecialRecipe = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  time: string;
  rating: number;
  reviewCount: number;
  author: string;
};

type Props = {
  recipe?: SpecialRecipe;
};

const defaultRecipe: SpecialRecipe = {
  id: 1,
  title: '토마토를 활용한 특별한 날의 브런치',
  description:
    '안녕하세요! 오늘은 토마토를 이용한 요리를 해보려고 합니다~ 간단하지만 맛은 결코 간단하지 않은...^^ 그런 요리에요. 특별한 날 기분까지 좋아지는 브런치로 만들어보세요!',
  imageUrl: '/asset/special_recipe.svg',
  time: '1시간 30분',
  rating: 4.7,
  reviewCount: 5,
  author: 'xhakohpasta',
};

const SpecialRecipeSection = ({ recipe = defaultRecipe }: Props) => {
  return (
    <section className="w-full bg-[#F6F3EE] pt-[32px] px-[20px] pb-[40px] mt-[56px]">
      {/* 섹션 헤더 */}
      <div className="flex justify-between items-center mb-[8px]">
        <div className="text-[18px] font-semibold tracking-[-0.03em] leading-[18px] text-[#222222]">
          <span className="text-[#4BE42C]">🥂 특별한 날</span>에 좋은 요리
        </div>
        <button className="text-[13px] text-[#9A9A9A]">전체보기 &gt;</button>
      </div>

      {/* 부제목 */}
      <p className="text-[13px] text-[#9F9F9F] mb-[16px]">
        기념일이나 생일에 좋은 요리를 알려드릴게요
      </p>

      {/* 카드 */}
      <div className="w-full rounded-xl overflow-hidden shadow-sm border border-[#F0F0F0] bg-white">
        <div className="w-full h-[160px] bg-gray-100">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 pt-[16px] pb-[12px]">
          <h3 className="text-[14px] font-semibold text-[#333333] leading-[17px] mb-[6px]">
            {recipe.title}
          </h3>
          <p className="text-[13px] text-[#666666] leading-[1.4] mb-[10px]">
            {recipe.description}
          </p>

          <div className="flex items-center gap-2 text-[12px] text-[#9F9F9F]">
            <div className="flex items-center gap-[4px]">
              <LuClock3 className="text-[14px]" />
              <span>{recipe.time}</span>
            </div>

            {recipe.rating !== null && (
              <div className="flex items-center gap-[4px]">
                <AiFillStar className="text-[#FFD600] text-[14px]" />
                <span className="text-[#333333] font-semibold text-[13px]">
                  {recipe.rating}
                </span>
                <span className="text-[#9F9F9F] text-[13px]">({recipe.reviewCount})</span>
              </div>
            )}

            <div className="ml-auto text-[#C2C2C2] text-[13px]">by. {recipe.author}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialRecipeSection;
