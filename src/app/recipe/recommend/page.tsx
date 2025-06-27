'use client';

import RecipeSortSelector from '../../../components/detail/RecipeSortSelector';
import RecipeGridList from '@/components/detail/RecipeGridList';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import { useState, useEffect} from 'react';
import { GetHotRecipe } from '@/api/recipe/getHotRecipe';

export default function RecommendRecipePage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [nickname, setNickname] = useState('');

  
  useEffect(() => {
    const fetchRecipes = async () => {
      const nickname = localStorage.getItem('nickname') || '';
        setNickname(nickname);
        try {
          const res = await GetHotRecipe();
          setRecipes(res);
        } catch (error) {
          console.error('레시피 데이터 로딩 실패:', error);
        } 
      };
        fetchRecipes();
      }, []);

  return (
    <>
      <Header>
        <Header.BackButton />
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col">
          <main className="flex flex-col items-start mt-[24px] px-4">
            <div className="px-5 text-[22px] font-semibold leading-[30px] tracking-[-0.03em] text-[#222] mb-8">
              <span>{nickname || '고객'}</span>님께
              <span className="text-[#4BE42C]"> 추천하는 </span>
              <div>레시피를 알려드려요!</div>
            </div>
            <RecipeSortSelector />
            <RecipeGridList recipes={recipes} />
          </main>
        </div>
      </DefaultBody>
    </>
  );
}
