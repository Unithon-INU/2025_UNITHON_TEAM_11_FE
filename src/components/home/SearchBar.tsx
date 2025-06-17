// components/home/SearchBar.tsx
'use client';

import React from 'react';
import { FiSearch } from 'react-icons/fi';
import CartButton from './CartButton';

type SearchBarProps = {
  showCartButton?: boolean; // 장바구니 버튼 표시 여부 (기본값: true)
};

const SearchBar = ({ showCartButton = true }: SearchBarProps) => {
  return (
    <div className="w-full flex items-center justify-between px-4 pt-4">
      {/* 검색창 */}
      <div className={`flex items-center bg-[#F3F0EC] rounded-xl px-3 py-2 ${showCartButton ? 'w-full mr-2' : 'flex-1'}`}>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          className="w-full bg-transparent outline-none text-sm text-[#333333]"
        />        
        <img src='/asset/searchBtn.svg' className="text-[#999999] text-lg mr-2" />

      </div>

      {/* 장바구니 버튼 (선택적 표시) */}
      {showCartButton && <CartButton />}
    </div>
  );
};

export default SearchBar;
