'use client';

import '@/app/globals.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DefaultBody from '@/components/defaultBody';
import BottomNav from '@/components/BottonNav';
import HomeCarousel from '@/components/home/HomeCarousel';
import CategoryChips from '@/components/home/CategoryChips';
import ProductSection from '@/components/home/ProductSection';
import RecipeSection from '@/components/home/RecipeSection';
import SpecialRecipeSection from '@/components/home/SpecialRecipeSection';
import SearchBar from '@/components/home/SearchBar';
import { GetMain } from '@/api/main/getMain';
import { SpecialRecipe } from '@/components/home/SpecialRecipeSection';

export default function MainPage() {

  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [specialRecipe, setSpecialRecipe] = useState<SpecialRecipe | null>(null);

  useEffect(() => {
    const fetchMain = async () => {
      try {
        const res = await GetMain();
        console.log(res);
        setProducts(res.simpleProductResponseDtos || []);
        setRecipes(res.simpleRecipeResponseDtos || []);
        setSpecialRecipe({
          id: res.specialRecipeResponseDto.id,
          title: res.specialRecipeResponseDto.title,
          description: res.specialRecipeResponseDto.content,
          imageUrl: res.specialRecipeResponseDto.image,
          time: res.specialRecipeResponseDto.time,
          rating: res.specialRecipeResponseDto.rating,
          reviewCount: res.specialRecipeResponseDto.comment,
          author: '관리자'
        });
      } catch (error) {
        console.error('메인 데이터 로딩 실패:', error);
      }
    };

    fetchMain();
  }, []);

  return (
    <div className='mt-auto mb-auto'>
      <DefaultBody hasHeader={0}>
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#FFFDFB]">
          {/* 검색창 */}
          <SearchBar />

          {/* 캐러셀 */}
          <HomeCarousel />

          {/* 카테고리 버튼들 */}
          <CategoryChips />

          {/* 특가 농수산물 섹션 */}
          <ProductSection
            titleAccent="⏰ 특가"
            titleRest="농수산물"
            subtitle="좋은 가격에 살 수 있는 특가 농수산물"
            products={products}
            onMoreClick={() => router.push('/sale-product')}
          />

          {/* 오늘 저녁 섹션 */}
          <RecipeSection
            titleAccent="🥘 오늘 저녁"
            titleRest="어떠세요?"
            recipes={recipes}
            onMoreClick={() => router.push('/recommend-recipe')}
          />

          {/* 특별한 날 요리 */}
          {specialRecipe && <SpecialRecipeSection recipe={specialRecipe} />}
        </div>
      </DefaultBody>
      <BottomNav activeIndex={0} />
    </div>
  );
}
