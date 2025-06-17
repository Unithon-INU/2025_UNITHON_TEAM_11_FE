// components/home/CategoryChips.tsx
'use client';

import React from 'react';

const categories = [
  { label: '레시피 유저', icon: '🧑‍🍳' },
  { label: '지금 핫한 레시피', icon: '🔥' },
  { label: '최근 레시피', icon: '🌟' },
  { label: '특가 농수산품', icon: '⏰' },
  { label: '농산물 마켓', icon: '👩‍🌾' },
  { label: '못난이 마켓', icon: '🥸' },
];

const CategoryChips = () => {
  return (
    <div className="w-full overflow-x-auto px-4 mt-[16px] scrollbar-hide">
      <div className="flex flex-wrap gap-2 min-w-[430px] py-2 ">
        {categories.map((category, index) => (
          <button
            key={index}
            className="flex items-center gap-2 px-[16px] py-[13px] rounded-xl border border-[#EDE7DE] bg-white font-medium text-[14px] leading-[17px] tracking-[-0.03em] text-[#222222] whitespace-nowrap w-auto"
          >
            <span>{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryChips;
