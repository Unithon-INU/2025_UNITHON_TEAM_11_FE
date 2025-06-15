// components/home/CategoryChips.tsx
'use client';

import React from 'react';

const categories = [
  { label: '특가 농수산품', icon: '🍓' },
  { label: '농산물 마켓', icon: '🥬' },
  { label: '못난이 마켓', icon: '🍠' },
];

const CategoryChips = () => {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {categories.map((category, index) => (
        <button
          key={index}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#EDE7DE] bg-white text-sm text-[#333] shadow-sm"
        >
          <span>{category.icon}</span>
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
