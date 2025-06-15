// components/home/SpecialRecipeSection.tsx

'use client';
import React from 'react';

const SpecialRecipeSection = () => {
  return (
    <section className="w-full px-4 mt-8">
      {/* 섹션 헤더 */}
      <div className="flex justify-between items-center mb-3">
        <div className="text-[15px] font-semibold">
          <span className="text-[#A8C400] mr-1">🥂</span>
          특별한 날에 좋은 요리
        </div>
        <button className="text-[13px] text-[#9A9A9A]">전체보기 &gt;</button>
      </div>

      {/* 소개 카드 */}
      <div className="w-full rounded-xl overflow-hidden shadow-sm border border-[#F0F0F0] bg-white">
        <div className="w-full h-[160px] bg-gray-100">
          <img
            src="/asset/special_recipe.svg"
            alt="토마토를 활용한 특별한 날의 브런치"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-[14px] font-semibold text-[#333] mb-1">
            토마토를 활용한 특별한 날의 브런치
          </h3>
          <p className="text-[13px] text-[#666666] leading-[1.4]">
            안녕하세요! 오늘은 토마토를 이용한 요리를 해보려고 합니다~ 간단하지만 맛은 결코 포기하지 않은, 그런 요리에요. 특별한 날 기분까지 좋아지는 브런치로 만들어보세요!
          </p>
        </div>
      </div>
    </section>
  );
};

export default SpecialRecipeSection;
