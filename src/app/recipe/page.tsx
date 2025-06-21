'use client';
import '@/app/globals.css';
import React, { useEffect, useState } from 'react';
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
import { GetMainRecipe } from '@/api/main/getMainRecipe';
import { SpecialRecipe } from '@/components/home/SpecialRecipeSection';

export default function MarketPage() {

 
  const router = useRouter();
  const { userInfo } = useUser();

  const [hotrecipes, setHotRecipes] = useState([]);
  const [newrecipes, setNewRecipes] = useState([]);
  const [recipeUsers, setRecipeUsers] = useState([]);
  const [specialRecipe, setSpecialRecipe] = useState<SpecialRecipe | null>(null);
  

   useEffect(() => {
      const fetchMain = async () => {
        try {
          const res = await GetMainRecipe();
          console.log(res);
          setHotRecipes(res.simpleRecipeResponseDtos || []);
          setNewRecipes(res.newRecipeResponseDtos || []);
          setRecipeUsers(res.simpleMemberResponseDtos || []);
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
            recipes={hotrecipes}
            
          />

          <RecipeCircleSection
            userNickname= {userInfo.nickname || '고객'}
            recipes={recipeUsers}
            onRefresh={() => console.log('새로 고침')}
            
          />

          {/* 자주 구매한 농수산품 섹션 */}
          <RecipeSection
            titleAccent="🌟 지금"
            titleRest="올라온 레시피"
            subtitle={`${userInfo.nickname || '고객'}님을 위한 심도깊은 레시피`}
            recipes={newrecipes}
          />

          {/* 특별한 날 요리 */}
          {specialRecipe && <SpecialRecipeSection recipe={specialRecipe} />}
        


      </div>
    </DefaultBody>
    <BottomNav activeIndex={2}></BottomNav>
    </div>
  );
}
