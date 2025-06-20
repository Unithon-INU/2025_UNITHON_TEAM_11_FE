// RecipeSortSelector.tsx
'use client';
import React from 'react';

const RecipeSortSelector = () => {
  return (
    <div className="flex self-end px-5 mt-1">
      <button className="text-[14px] text-[#666] flex gap-1 items-center">추천순 <span><img src={'asset/ChevronDown.svg'}></img></span></button>
    </div>
  );
};

export default RecipeSortSelector;