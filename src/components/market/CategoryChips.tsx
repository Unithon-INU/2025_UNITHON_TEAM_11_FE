// components/home/CategoryChips.tsx
'use client';

import React from 'react';

const categories = [
 
  { label: '최근 본 레시피', icon: '🌟' },
  { label: '농수산품 판매자 둘러보기', icon: '👩‍🌾' },
];

const CategoryChips = () => {
  return (
    <div className="w-full overflow-x-auto px-4 mt-[16px] scrollbar-hide">
      <div className="flex flex-wrap gap-2 min-w-[430px] py-2 ">
        {categories.map((category, index) => (
          <button
            key={index}
            className="flex items-center gap-2 px-[16px] py-[13px] rounded-xl border border-[#EDE7DE]  font-medium text-[14px] leading-[17px] tracking-[-0.03em] text-[#222222] whitespace-nowrap w-auto"
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
