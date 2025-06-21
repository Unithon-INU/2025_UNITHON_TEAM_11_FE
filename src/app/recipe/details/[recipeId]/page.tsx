'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import RecipeTabs from '@/components/recipe/RecipeTabs';
import ProductOptionDrawer from '@/components/market/ProductOptionDrawer';
import { GetRecipeDetail } from '@/api/recipe/getRecipeDetail';
import { RecipeDetail } from '@/types/RecipeDetail';
import RecipeSection from '@/components/home/RecipeSection';
import { checkAuthAndRedirect } from '@/utils/checkAuthAndRedirect'

export default function RecipeDetailPage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<RecipeDetail>();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await GetRecipeDetail(recipeId, 0);
        setRecipe(res);
      } catch (error) {
        console.error('레시피 데이터 로딩 실패:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const router = useRouter();
  const [recipeLiked, setRecipeLiked] = useState(recipe?.isLiked);
  const [recipeCount, setRecipeCount] = useState(recipe?.likeCount || 0);

  const [liked, setLiked] = useState(false);
  const requireAuth = checkAuthAndRedirect()

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (recipe) {
      setLiked(recipe.isLiked);
      setCount(recipe.likeCount);
    }
  }, [recipe]);

  const handleToggleLike = () => {
    if (!requireAuth()) return

    setLiked(prev => !prev);
    setCount(prev => (liked ? prev - 1 : prev + 1));
  };

  const handleToggleRecipeLike = () => {
    if (!requireAuth()) return

    setRecipeLiked(prev => !prev);
    setRecipeCount(prev => (recipeLiked ? prev - 1 : prev + 1));
  };
  if (!recipe) return null;

  const handleClickSeller = () => {
    router.push(`/profile/${recipe.member.memberId}?isSeller=${recipe.member.isSeller}`)

  }
  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.RightButton>
          <Header.HomeButton />
          <Header.ShareButton />
        </Header.RightButton>
      </Header>

      <div className="relative pb-[80px]">
        <DefaultBody hasHeader={1}>
          <main className="flex flex-col">
            {/* 레시피 이미지 */}
            <div className="w-[100%] aspect-[1/1] bg-gray-100">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 글쓴이 */}
            <div className="text-[13px] text-[#9F9F9F] px-[20px] py-[12px] border-b border-[#D9D9D9]">
              {recipe.member.nickname} &gt;
            </div>

            <div className="relative px-4 py-[24px]">
                {/* 우상단 책갈피 하트 */}
                <button
                    onClick={handleToggleRecipeLike}
                    className="absolute right-4 top-0  w-[64px] h-[88px] rounded-bl-[12px] flex flex-col items-center justify-center"
                >
                    <Image
                    src={recipeLiked ? '/asset/heartBookmarkFilled.svg' : '/asset/heartBookmark.svg'}
                    alt="좋아요"
                    width={64}
                    height={88}
                    />
                    <span className={`text-[13px] ${recipeLiked ? 'text-[#817468]' : 'text-[#FFFDFB]'} absolute top-11`}>
                    {recipeCount?.toLocaleString?.() || '0'}
                    </span>
                </button>

                {/* 제목 & 별점 */}
                <h1 className="text-[18px] font-semibold text-[#222]">
                    {recipe.title}
                </h1>
                <div className="flex items-center mt-1">
                    <span className="text-[14px] text-[#FFD600]">★</span>
                    <span className="ml-1 text-[14px] text-[#C2C2C2]">
                    <span className="text-[#222]">{recipe.rating} </span>
                    ({recipe.totalReviewCount?.toLocaleString?.() || '0'})
                    </span>
                </div>

                {/* 레시피 소개 글 */}
                <p className="mt-[38px] text-[15px] text-[#444] leading-[22px] whitespace-pre-line">
                    {recipe.content}
                </p>

                {/* 조리 정보 */}
                <div className="flex justify-start gap-12 text-[16px] text-[#5E5E5E] font-medium mt-6">
                    <div className="flex flex-col items-start">
                    <span className="text-[#9F9F9F] mb-[4px] text-[14px]">조리 시간</span>
                    <span>{recipe.cookingTime}</span>
                    </div>
                    <div className="flex flex-col items-start">
                    <span className="text-[#9F9F9F] mb-[4px] text-[14px]">분량</span>
                    <span>{recipe.headCount}인분</span>
                    </div>
                    <div className="flex flex-col items-start">
                    <span className="text-[#9F9F9F] mb-[4px] text-[14px]">난이도</span>
                    <span>{recipe.difficulty}</span>
                    </div>
                </div>
            </div>


            {/* 작성자 정보 + 좋아요 */}
            <div className="flex items-center justify-between px-4 py-4 border-[#F6F3EE] border-t-8 border-b-8 mt-2">
              <div className="flex items-center gap-2" onClick={handleClickSeller}>
                <Image
                  src="/asset/goril.svg"
                  alt="프로필"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="text-sm">
                  <div className="font-semibold text-[14px] text-[#222]">{recipe.member.nickname}</div>
                  <div className="text-[14px] text-[#9F9F9F] mt-[4px]">{recipe.member.introduction}</div>
                </div>
              </div>
              <button onClick={handleToggleLike} className="flex flex-col items-center">
                <Image
                  src={liked ? '/asset/heartBtnA.svg' : '/asset/heart.svg'}
                  alt="좋아요"
                  width={24}
                  height={24}
                />
                <span className="text-[12px] text-[#9F9F9F] mt-[2px]">{count?.toLocaleString() || '0'}</span>
              </button>
            </div>

           

            <RecipeTabs ingredients={recipe.ingredients} sauces={recipe.sauces} steps={recipe.steps} reviews={recipe.reviews} totalReviewCount={recipe.totalReviewCount} 
                    rating={recipe.rating} recentImageUrls={recipe.recentImageUrls} comments={recipe.comments}/>

          </main>
        </DefaultBody>

        {/* 하단 고정 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 px-4 py-3 max-w-[500px] mx-auto flex items-center gap-2">
          
        </div>

      </div>
    </>
  );
}
