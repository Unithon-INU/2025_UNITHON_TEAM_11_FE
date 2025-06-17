'use client';
import '@/app/globals.css';
import React from 'react';
import DefaultBody from '@/components/defaultBody';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottonNav';
import RecipeCarousel from '@/components/recipe/RecipeCarousel';
import CategoryChips from '@/components/recipe/CategoryChips';
import RecipeSection from '@/components/home/RecipeSection';
import SearchBar from '@/components/home/SearchBar';
import SpecialRecipeSection from '@/components/home/SpecialRecipeSection';
import RecipeCircleSection from '@/components/recipe/RecipeCircleSection';
import { useUser } from '@/context/UserContext';


export default function MarketPage() {

  const dummyRecipes = [
  { id: 1, title: '건강하게먹기', imageUrl: '/asset/rec1.svg' },
  { id: 2, title: '타코열정남', imageUrl: '/asset/rec2.svg' },
  { id: 3, title: '아이와 함께', imageUrl: '/asset/rec1.svg' },
  { id: 4, title: '할머니 밥상', imageUrl: '/asset/rec2.svg' },
  { id: 5, title: '티니핑 밥상', imageUrl: '/asset/rec1.svg' },

];
 
  const router = useRouter();
  const { userInfo } = useUser();
 
  return (
    <div className='mt-auto mb-auto'>
    <DefaultBody hasHeader={0} >
      <div className="flex flex-col items-center justify-center  w-full h-full bg-[#FFFDFB] ">
        {/* 검색창 */}
          <SearchBar />

          {/* 캐러셀 */}
          <RecipeCarousel />

          {/* 카테고리 버튼들 */}
          <CategoryChips />

          {/* 추천 농수산물 섹션 */}
          <RecipeSection
            titleAccent="🔥 요즘 핫한"
            titleRest="레시피"
            subtitle={`${userInfo.nickname || '고객'}님을 위한 심도깊은 레시피`}
          />

          <RecipeCircleSection
            userNickname= {userInfo.nickname || '고객'}
            recipes={dummyRecipes}
            onRefresh={() => console.log('새로 고침')}
          />

          {/* 자주 구매한 농수산품 섹션 */}
          <RecipeSection
            titleAccent="🌟 지금"
            titleRest="올라온 레시피"
            subtitle={`${userInfo.nickname || '고객'}님을 위한 심도깊은 레시피`}
          />

          {/* 하단 레시피 섹션 */}
          <SpecialRecipeSection />


      </div>
    </DefaultBody>
    <BottomNav activeIndex={0}></BottomNav>
    </div>
  );
}
