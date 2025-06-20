'use client';

import React, { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import { LuClock3 } from 'react-icons/lu';
import { useUser } from '@/context/UserContext';

export type Recipe = {
  id: number;
  title: string;
  image: string;
  time: string;
  rating: number;
  isLiked: boolean;
  comment: number;
};

type RecipeSectionProps = {
  titleAccent?: string;
  titleRest?: string;
  subtitle?: string;
  recipes?: Recipe[]; // 외부 주입 가능
};

const defaultRecipes: Recipe[] = [
  {
    id: 1,
    title: '아이와 함께 만드는 맛있는 건강 피자',
    image: '/asset/broccoli.svg',
    time: '1시간 30분',
    rating: 4.7,
    isLiked: true,
    comment: 5,
  },
  {
    id: 2,
    title: '감성뿜뿜 프렌치토스트',
    image: '/asset/broccoli.svg',
    time: '1시간 30분',
    rating: 3.5,
    isLiked: false,
    comment: 2,
  },
  {
    id: 3,
    title: '존맛탱',
    image: '/asset/broccoli.svg',
    time: '1시간 30분',
    rating: 1.1,
    isLiked: false,
    comment: 0,
  },
];

const RecipeSection = ({
  titleAccent = '🥘 오늘 저녁',
  titleRest = '추천 레시피',
  subtitle,
  recipes = defaultRecipes, // 기본값 설정
}: RecipeSectionProps) => {
  const [likes, setLikes] = useState<Record<number, boolean>>(
    Object.fromEntries(recipes.map((r) => [r.id, r.isLiked]))
  );

  const { userInfo } = useUser();

  const toggleLike = (id: number) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full px-4 mt-[56px]">
      {/* 섹션 헤더 */}
      <div className="flex justify-between items-center mb-1">
        <div className="font-semibold text-[18px] leading-[125%] tracking-[-0.03em]">
          <span className="text-[#4BE42C] mr-1">{titleAccent}</span>
          {titleRest}
        </div>
        <button className="text-[13px] text-[#9A9A9A]">더보기 &gt;</button>
      </div>

      {/* 부제목 */}
      <p className="w-[354px] h-[18px] font-medium text-[14px] leading-[125%] tracking-[-0.03em] text-[#9F9F9F] mb-3">
        {subtitle ?? `${userInfo.nickname || '고객'}님을 위한 심도깊은 레시피`}
      </p>

      {/* 레시피 리스트 */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="w-[140px] h-[230px] shrink-0 flex flex-col justify-start"
          >
            {/* 이미지 */}
            <div className="relative w-full h-[140px] rounded-lg overflow-hidden bg-gray-100">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleLike(recipe.id)}
                className="absolute bottom-2 right-2"
              >
                {likes[recipe.id] ? (
                  <AiFillHeart className="text-green-500 text-xl" />
                ) : (
                  <FiHeart className="text-gray-400 text-xl" />
                )}
              </button>
            </div>

            {/* 제목 */}
            <div className="mt-2 text-[13px] leading-[1.2] text-gray-800 h-[36px] break-words overflow-hidden">
              {recipe.title}
            </div>

            {/* 시간 + 별점 */}
            <div className="mt-auto text-[12px]">
              <div className="flex items-center text-[#9F9F9F] gap-[4px] mb-[2px]">
                <LuClock3 className="text-[13px]" />
                <span>{recipe.time}</span>
              </div>
              {recipe.rating && (
                <div className="flex items-center gap-[4px]">
                  <p className="text-[#FFD600] text-[13px]">⭐</p>
                  <span className="text-[13px] font-semibold text-[#333333]">
                    {recipe.rating}
                  </span>
                  <span className="text-[13px] text-[#9F9F9F]">
                    ({recipe.comment})
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeSection;
