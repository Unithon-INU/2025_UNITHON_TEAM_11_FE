// components/home/CategoryChips.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type Category = {
  label: string;
  icon: string;
  onClick?: string; // 각 버튼에 대한 클릭 핸들러
};

type CategoryChipsProps = {
  categories?: Category[]; // 외부에서 주입 가능
};

const defaultCategories: Category[] = [
  { label: '레시피 유저 둘러보기', icon: '🧑‍🍳', onClick:'/recipe/users' },
  { label: '지금 핫한 레시피', icon: '🔥' },
  { label: '최근 본 레시피', icon: '🌟' },
];

const CategoryChips = ({ categories = defaultCategories }: CategoryChipsProps) => {

  const router= useRouter();

  return (
    <div className="w-full overflow-x-auto px-4 mt-[16px] scrollbar-hide">
      <div className="flex gap-2 min-w-[430px] py-2 ">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={()=>{router.push(`${category.onClick}`)}}
            className="flex items-center gap-2 px-[16px] py-[13px] rounded-xl border border-[#EDE7DE] font-medium text-[14px] leading-[17px] tracking-[-0.03em] text-[#222222] whitespace-nowrap w-auto"
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
