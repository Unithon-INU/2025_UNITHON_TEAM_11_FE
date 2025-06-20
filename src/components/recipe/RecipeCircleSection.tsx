'use client';
import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import Image from 'next/image';

type RecipeItem = {
  id: number;
  nickname: string;
  imageUrl: string;
};

type Props = {
  userNickname?: string;
  recipes: RecipeItem[];
  onRefresh?: () => void;
  
};

const RecipeCircleSection = ({
  userNickname = '고객',
  recipes,
  onRefresh,
  
}: Props) => {
  return (
    <section className="w-full bg-[#F6F3EE] px-4 pt-6 pb-5 mt-[56px]">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-[4px]">
        <div className="text-[18px] font-semibold tracking-[-0.03em] text-[#222]">
          <span className="text-[#4BE42C] mr-[4px]">🧑‍🍳 요리 선생님</span>추천
        </div>
        <button
          onClick={onRefresh}
          className="text-[13px] text-[#666] flex items-center gap-1"
        >
          새로 고침
          <FiRefreshCw className="text-[14px]" />
        </button>
      </div>

      {/* 부제목 */}
      <p className="font-medium text-[14px] leading-[125%] tracking-[-0.03em] text-[#9F9F9F] mb-3">
        {userNickname}님을 위한 요리 선생님을 추천해요
      </p>

      {/* 썸네일 리스트 */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {recipes.map((r) => (
          <div key={r.id} className="flex flex-col items-center shrink-0 w-[64px]">
            <div className="w-[64px] h-[64px] rounded-full overflow-hidden bg-gray-200">
              <Image
                src={r.imageUrl}
                alt={r.nickname}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[13px] text-[#333] text-center mt-1 truncate w-full leading-tight">
              {r.nickname}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeCircleSection;
