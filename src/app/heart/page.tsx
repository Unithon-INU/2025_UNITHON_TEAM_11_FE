'use client';

import '@/app/globals.css';
import React, { useState, useEffect } from 'react';
import DefaultBody from '@/components/defaultBody';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottonNav';
import Header from '@/components/header/Header';
import RecipeGridList from '@/components/detail/RecipeGridList';
import ProductGridList from '@/components/detail/ProductGridList';
import SearchBar from '@/components/home/SearchBar';
import RecipeUserListSection from '@/components/recipe/users/RecipeUserListSection';
import { GetRecipeHeart } from '@/api/heart/getRecipeHeart';
import { GetProductHeart } from '@/api/heart/getProductHeart';
import { GetUserHeart } from '@/api/heart/getUserHeart';
import { GetFarmHeart } from '@/api/heart/getFarmHeart';
import { getAccessToken } from '@/utils/tokenStorage';

export default function FavoritePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'레시피' | '판매 농수산물'>('레시피');
  const [activeRecipeTab, setActiveRecipeTab] = useState<'레시피' | '레시피 유저'>('레시피');
  const [activeProductTab, setActiveProductTab] = useState<'농수산품' | '스토어팜'>('농수산품');

  const [recipeList, setRecipeList] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [farmList, setFarmList] = useState<any[]>([]);
  const [hasAccessToken, setHasAccessToken] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = getAccessToken();
      if (!token) {
        setHasAccessToken(false);
        return;
      }

      try {
        const [recipes, products, users, farms] = await Promise.all([
          GetRecipeHeart(0),
          GetProductHeart(0),
          GetUserHeart(0),
          GetFarmHeart(0),
        ]);
        setRecipeList(Array.isArray(recipes) ? recipes : []);
        setProductList(Array.isArray(products) ? products : []);
        setUserList(Array.isArray(users) ? users : []);
        setFarmList(Array.isArray(farms) ? farms : []);
      } catch (err) {
        console.error('찜한 항목 로드 실패:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header>
        <Header.Title>찜한 목록</Header.Title>
        <Header.RightButton>
          <Header.CartButton />
        </Header.RightButton>
      </Header>

      <DefaultBody hasHeader={1}>
        <div className="relative pb-[80px]">
          {!hasAccessToken ? (
            <div className="w-full h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-6 px-4">
              <div className="text-center text-[#888] text-[16px] font-medium">
                로그인 후 이용가능한 기능입니다.
              </div>
              <button
                onClick={() => router.push('/login')}
                className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#333] transition-all"
              >
                로그인하러 가기
              </button>
            </div>

          ) : (
            <div className="flex flex-col items-center justify-start w-full h-full bg-[#FFFDFB]">
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
                        onClick={() =>
                          setActiveRecipeTab(tab as '레시피' | '레시피 유저')
                        }
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

                  <div className="w-full mx-[-10] mt-4">
                    <SearchBar showCartButton={false} />
                  </div>

                  <div className="w-full px-2">
                    <div className="w-full px-4 flex justify-between items-center text-[18px] font-semibold mb-4 mt-6">
                      <span>
                        {activeRecipeTab === '레시피' ? recipeList.length : userList.length}개의 {activeRecipeTab}
                      </span>
                      <span className="text-[#5E5E5E] text-[15px] font-medium flex flex-row gap-1">
                        찜한순 <img src={'/asset/ChevronDown.svg'} />
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
                        onClick={() =>
                          setActiveProductTab(tab as '농수산품' | '스토어팜')
                        }
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

                  <div className="w-full mx-[-10] mt-4">
                    <SearchBar showCartButton={false} />
                  </div>

                  <div className="w-full px-2">
                    <div className="w-full px-4 flex justify-between items-center text-[18px] font-semibold mb-4 mt-6">
                      <span>
                        {activeProductTab === '농수산품'
                          ? productList.length
                          : farmList.length}
                        개의 {activeProductTab}
                      </span>
                      <span className="text-[#5E5E5E] text-[15px] font-medium flex flex-row gap-1">
                        찜한순 <img src={'/asset/ChevronDown.svg'} />
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
            </div>
          )}
        </div>
      </DefaultBody>

      <BottomNav activeIndex={3} />
    </>
  );
}
