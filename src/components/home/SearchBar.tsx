// components/home/SearchBar.tsx
'use client';

import React from 'react';

const SearchBar = () => {
  return (
    <div className="pt-4">
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        className="w-full h-10 px-4 text-sm border border-[#EDE7DE] rounded-md bg-[#F9F7F4]"
      />
    </div>
  );
};

export default SearchBar;
