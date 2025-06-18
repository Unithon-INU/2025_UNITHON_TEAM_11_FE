// components/home/SearchBar.tsx
'use client';

import React from 'react';
import { FiSearch } from 'react-icons/fi';
import CartButton from '../header/CartButton';

type SearchBarProps = {
  showCartButton?: boolean; // 장바구니 버튼 표시 여부 (기본값: true)
};

const SearchBar = ({ showCartButton = true }: SearchBarProps) => {
  return (
   <div
      className="fixed top-0 left-0 right-0 flex items-center h-[56px] px-4 bg-white w-full max-w-[500px] mx-auto z-50"
    >
      <div className='flex w-full self-center items-center justify-center'>
        <div className='flex w-[90%] self-center items-center'>
          {/* 검색창 */}
          <div className={`flex items-center bg-[#F3F0EC] rounded-[8px] px-3 py-2 ${showCartButton ? 'w-full mr-3' : 'flex-1'}`}>
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
      </div>
    </div>
  );
};

export default SearchBar;
