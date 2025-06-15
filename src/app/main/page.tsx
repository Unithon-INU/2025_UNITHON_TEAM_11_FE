'use client';
import '@/app/globals.css';
import React, { useState } from 'react';
import DefaultBody from '@/components/defaultBody';
import DefaultInput from '@/components/DefaultInput';
import CommonButton from '@/components/CommonButton';
import { useRouter } from 'next/navigation';
import { PostLogin } from '@/api/postLogin';
import BottomNav from '@/components/BottonNav';
import HomeCarousel from '@/components/home/HomeCarousel';
import CategoryChips from '@/components/home/CategoryChips';
import ProductSection from '@/components/home/ProductSection';
import RecipeSection from '@/components/home/RecipeSection';
import SpecialRecipeSection from '@/components/home/SpecialRecipeSection';
import SearchBar from '@/components/home/SearchBar';

export default function MainPage() {
 
  const router = useRouter();
  
 
  return (
    <div className='mt-auto mb-auto'>
    <DefaultBody hasHeader={0} >
      <div className="flex flex-col items-center justify-center  w-full h-full bg-[#FFFDFB] ">
        {/* 검색창 */}
          <SearchBar />

          {/* 캐러셀 */}
          <HomeCarousel />

          {/* 카테고리 버튼들 */}
          <CategoryChips />

          {/* 특가 농수산물 섹션 */}
          <ProductSection />

          {/* 오늘 저녁 섹션 */}
          <RecipeSection title="오늘 저녁 어떠세요?" />

          {/* 특별한 날 요리 */}
          <SpecialRecipeSection />
      </div>
    </DefaultBody>
    <BottomNav activeIndex={0}></BottomNav>
    </div>
  );
}
