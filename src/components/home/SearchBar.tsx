// components/home/SearchBar.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CartButton from '../header/CartButton';

type SearchBarProps = {
  showCartButton?: boolean; // 장바구니 버튼 표시 여부
  type: 'main' | 'recipe' | 'product' | 'user'; // ✅ 검색 타입
};

const SearchBar = ({ showCartButton = true, type }: SearchBarProps) => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (!trimmed) {
      alert('검색어를 입력해주세요.');
      return;
    }
    router.push(`/search/${type}/${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="flex items-center h-[56px] px-4 bg-white w-full max-w-[500px] mx-auto z-50">
      <div className='flex w-full self-center items-center justify-center'>
        <div className='flex w-[95%] self-center items-center'>
          {/* 검색창 */}
          <div className={`flex items-center bg-[#F3F0EC] rounded-[8px] px-3 py-2 ${showCartButton ? 'w-full mr-3' : 'flex-1'}`}>
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              className="w-full bg-transparent outline-none text-sm text-[#333333]"
            />        
            <img 
              src='/asset/searchBtn.svg' 
              className="text-[#999999] text-lg mr-2 cursor-pointer" 
              onClick={handleSearch}
            />
          </div>

          {/* 장바구니 버튼 (선택적 표시) */}
          {showCartButton && <CartButton />}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
