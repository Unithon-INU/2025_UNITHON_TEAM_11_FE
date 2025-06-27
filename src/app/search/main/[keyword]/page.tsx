'use client';

import '@/app/globals.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import DefaultBody from '@/components/defaultBody';
import { useRouter, useParams } from 'next/navigation';
import BottomNav from '@/components/BottonNav';
import Header from '@/components/header/Header';
import RecipeGridList from '@/components/detail/RecipeGridList';
import ProductGridList from '@/components/detail/ProductGridList';
import RecipeUserListSection from '@/components/recipe/users/RecipeUserListSection';
import { GetSearchMain } from '@/api/main/getSearchMain';
import { Recipe } from '@/types/Recipe';
import { Product } from '@/types/Product';
import { Influencer } from '@/types/Influencer';

export default function SearchMainPage() {
  const router = useRouter();
  const { keyword } = useParams<{ keyword: string }>();
  const [activeTab, setActiveTab] = useState<'레시피' | '판매 농수산물'>('레시피');
  const [activeRecipeTab, setActiveRecipeTab] = useState<'레시피' | '레시피 유저'>('레시피');
  const [activeProductTab, setActiveProductTab] = useState<'농수산품' | '스토어팜'>('농수산품');

  const [recipeList, setRecipeList] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [farmList, setFarmList] = useState<any[]>([]);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async (pageNumber: number) => {
    if (!keyword || isFetching || !hasMore) return;
    setIsFetching(true);
    try {
      const res = await GetSearchMain(keyword, pageNumber);

      if (
        res.recipes.length === 0 &&
        res.products.length === 0 &&
        res.recipeMembers.length === 0 &&
        res.farmerMembers.length === 0
      ) {
        setHasMore(false);
        return;
      }

      setRecipeList((prev) => {
        const existingIds = new Set(prev.map((item:Recipe) => item.id));
        const filtered = res.recipes.filter((item:Recipe) => !existingIds.has(item.id));
        return [...prev, ...filtered];
      });

      setProductList((prev) => {
        const existingIds = new Set(prev.map((item:Product) => item.id));
        const filtered = res.products.filter((item:Product) => !existingIds.has(item.id));
        return [...prev, ...filtered];
      });

      setUserList((prev) => {
        const existingIds = new Set(prev.map((item:Influencer) => item.memberId));
        const filtered = res.recipeMembers.filter((item:Influencer) => !existingIds.has(item.memberId));
        return [...prev, ...filtered];
      });

      setFarmList((prev) => {
        const existingIds = new Set(prev.map((item:Influencer) => item.memberId));
        const filtered = res.farmerMembers.filter((item:Influencer) => !existingIds.has(item.memberId));
        return [...prev, ...filtered];
      });

      setPage((prev) => prev + 1);
    } catch (err) {
      console.error('검색 데이터 로드 실패:', err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setRecipeList([]);
    setProductList([]);
    setUserList([]);
    setFarmList([]);
    setPage(0);
    setHasMore(true);
    fetchData(0);
  }, [keyword]);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isFetching) {
        fetchData(page);
      }
    },
    [hasMore, isFetching, page, keyword]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleIntersect]);

  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.Title>검색 결과</Header.Title>
      </Header>

      <DefaultBody hasHeader={1}>
        <div className="relative pb-[80px]">
          <div className="flex flex-col items-center justify-start w-full h-full bg-[#FFFDFB]">
            {/* 상단 탭 */}
            <div className="w-full flex justify-center text-sm border-b border-[#F0F0F0]">
              {['레시피', '판매 농수산물'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as '레시피' | '판매 농수산물')}
                  className={`flex-1 text-center py-2 ${
                    activeTab === tab
                      ? 'border-b-2 border-black font-semibold text-[#222]'
                      : 'text-[#C2C2C2]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === '레시피' ? (
              <>
                <div className="inline-flex bg-[#F2EEE9] rounded-full p-1 mt-4">
                  {['레시피', '레시피 유저'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveRecipeTab(tab as '레시피' | '레시피 유저')}
                      className={`px-4 py-2 text-sm rounded-full transition-all ${
                        activeRecipeTab === tab
                          ? 'bg-white text-[#222] font-semibold'
                          : 'text-[#C2C2C2]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="w-full px-2">
                  <div className="w-full px-4 flex justify-between items-center text-[18px] font-semibold mb-4 mt-6">
                    <span>
                      {activeRecipeTab === '레시피' ? recipeList.length : userList.length}개의 {activeRecipeTab}
                    </span>
                  </div>

                  {activeRecipeTab === '레시피' ? (
                    <RecipeGridList recipes={recipeList} />
                  ) : (
                    <RecipeUserListSection users={userList} />
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="inline-flex bg-[#F2EEE9] rounded-full p-1 mt-6">
                  {['농수산품', '스토어팜'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveProductTab(tab as '농수산품' | '스토어팜')}
                      className={`px-4 py-2 text-sm rounded-full transition-all ${
                        activeProductTab === tab
                          ? 'bg-white text-[#222] font-semibold'
                          : 'text-[#C2C2C2]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="w-full px-2">
                  <div className="w-full px-4 flex justify-between items-center text-[18px] font-semibold mb-4 mt-6">
                    <span>
                      {activeProductTab === '농수산품'
                        ? productList.length
                        : farmList.length}
                      개의 {activeProductTab}
                    </span>
                  </div>

                  {activeProductTab === '농수산품' ? (
                    <ProductGridList products={productList} />
                  ) : (
                    <RecipeUserListSection users={farmList} />
                  )}
                </div>
              </>
            )}

            {/* 무한스크롤 sentinel */}
            {hasMore && <div ref={observerRef} className="w-full h-10" />}
          </div>
        </div>
      </DefaultBody>
      <BottomNav activeIndex={3} />
    </>
  );
}
