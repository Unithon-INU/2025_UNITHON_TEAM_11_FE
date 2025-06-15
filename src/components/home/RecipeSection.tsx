// components/home/RecipeSection.tsx

'use client';
import React from 'react';

type RecipeSectionProps = {
  title: string;
};

const recipes = [
  {
    id: 1,
    title: '아이와 함께 만드는 맛있는 건강 피자',
    image: '/asset/broccoli.svg',
    time: '1시간 30분',
    rating: 4.7,
  },
  {
    id: 2,
    title: '감성뿜뿜 프렌치토스트',
    image: '/asset/broccoli.svg',
    time: '1시간 30분',
    rating: null,
  },
  {
    id: 3,
    title: '존맛탱',
    image: '/asset/broccoli.svg',
    time: '1시간 30분',
    rating: null,
  },
];

const RecipeSection = ({ title }: RecipeSectionProps) => {
  return (
    <section className="w-full px-4 mt-6">
      {/* 섹션 헤더 */}
      <div className="flex justify-between items-center mb-3">
        <div className="text-[18px] font-semibold">
          <span className="text-[#89B900] text-[18px] mr-1">🥘</span>{title}
        </div>
        <button className="text-[13px] text-[#9A9A9A]">더보기 &gt;</button>
      </div>

      {/* 레시피 리스트 */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="min-w-[140px] shrink-0">
            <div className="relative w-full h-[140px] rounded-lg overflow-hidden bg-gray-100">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow text-green-500 text-sm">♡</div>
            </div>
            <div className="mt-2 text-[13px] leading-4 text-gray-800 line-clamp-2">
              {recipe.title}
            </div>
            <div className="text-[12px] text-[#888888] flex items-center gap-1 mt-1">
              <span>{recipe.time}</span>
              {recipe.rating && (
                <>
                  <span>·</span>
                  <span className="text-yellow-500">⭐ {recipe.rating}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeSection;
