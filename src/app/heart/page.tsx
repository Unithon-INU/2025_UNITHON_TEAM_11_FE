'use client';
import '@/app/globals.css';
import React, { useState } from 'react';
import DefaultBody from '@/components/defaultBody';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottonNav';
import Header from '@/components/header/Header';
import RecipeGridList from '@/components/detail/RecipeGridList'
import ProductGridList from '@/components/detail/ProductGridList' // 판매 농수산물용 (추가 필요)
import SearchBar from '@/components/home/SearchBar';
import RecipeUserListSection from '@/components/recipe/users/RecipeUserListSection';

export default function LoginPage() {
 
  const sampleRecipes = [
  {
    id: 1,
    title: '아보카도 샌드위치',
    image: '/sample/avocado.jpg',
    time: '1시간 30분',
    rating: 4.7,
    comment: 5,
    isLiked: true,
  },
  {
    id: 2,
    title: '아이와 함께 만드는 건강 피자',
    image: '/sample/pizza.jpg',
    time: '1시간 30분',
    rating: 4.7,
    comment: 5,
    isLiked: false,
  },
 
]

const sampleProducts = [
  {
    id: 1,
    name: '맛있는 당근',
    image: '/sample/carrot.jpg',
    price: 5000,
    salePrice: 3500,
    isLiked: false,
  },
  {
    id: 2,
    name: '유기농 토마토',
    image: '/sample/tomato.jpg',
    price: 6000,
    salePrice: 5400,
    isLiked: true,
  },
]


  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'레시피' | '판매 농수산물'>('레시피')
  const [activeRecipeTab, setActiveRecipeTab] = useState<'레시피' | '레시피 유저'>('레시피')
  const [activeProductTab,   setActiveProductTab] = useState<'농수산품' | '스토어팜'>('농수산품')

 
  return (
   <>
        <Header>
          <Header.Title>찜한 목록</Header.Title>
          <Header.RightButton>
            <Header.CartButton/>
          </Header.RightButton>
          
        </Header>
      <DefaultBody hasHeader={1} > 
      
      <div className='relative pb-[80px]'>
        <div className="flex flex-col items-center justify-start  w-full h-full bg-[#FFFDFB] ">
        
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
                            <button
                              onClick={() => setActiveRecipeTab('레시피')}
                              className={`px-4 py-2 text-sm rounded-full transition-all ${
                                activeRecipeTab === '레시피'
                                  ? 'bg-white text-[#222] font-semibold'
                                  : 'text-[#C2C2C2]'
                              }`}
                            >
                              레시피
                            </button>
                            <button
                              onClick={() => setActiveRecipeTab('레시피 유저')}
                              className={`px-4 py-2 text-sm rounded-full transition-all ${
                                activeRecipeTab === '레시피 유저'
                                  ? 'bg-white text-[#222] font-semibold'
                                  : 'text-[#C2C2C2]'
                              }`}
                            >
                              레시피 유저
                            </button>
                          </div> 
                            {/* 검색창 */}
                          <div className="w-full mx-[-10] mt-4">
                            <SearchBar showCartButton={false} />
                          </div>
                          <div className='w-full px-2'>
                            <div className="w-full px-4 flex justify-between items-center text-[18px] font-semibold mb-4 mt-6">
                                <span>4개의 {activeRecipeTab}</span>
                                <span className="text-[#5E5E5E] text-[15px] font-medium flex flex-row gap-1">
                                찜한순 <img src={'/asset/ChevronDown.svg'} />
                                </span>
                            </div>
                          
                            {activeRecipeTab === '레시피' ? (
                              <RecipeGridList recipes={sampleRecipes} />
                            ):(
                              <RecipeUserListSection/>
                            )}
                          </div>
                      </>
                    ) : (
                      <>
                        
                          <div className="inline-flex bg-[#F2EEE9] rounded-full p-1  mt-6">
                            <button
                              onClick={() => setActiveProductTab('농수산품')}
                              className={`px-4 py-2 text-sm rounded-full transition-all ${
                                activeProductTab === '농수산품'
                                  ? 'bg-white text-[#222] font-semibold'
                                  : 'text-[#C2C2C2]'
                              }`}
                            >
                              농수산품
                            </button>
                            <button
                              onClick={() => setActiveProductTab('스토어팜')}
                              className={`px-4 py-2 text-sm rounded-full transition-all ${
                                activeProductTab === '스토어팜'
                                  ? 'bg-white text-[#222] font-semibold'
                                  : 'text-[#C2C2C2]'
                              }`}
                            >
                              스토어팜
                            </button>
                          </div>  
                          
                          {/* 검색창 */}
                          <div className="w-full mx-[-10] mt-4">
                            <SearchBar showCartButton={false} />
                          </div>
                          
                          <div className='w-full px-2'>
                          <div className="w-full px-4 flex justify-between items-center text-[18px] font-semibold mb-4 mt-6">
                              <span>4개의 상품</span>
                              <span className="text-[#5E5E5E] text-[15px] font-medium flex flex-row gap-1">
                              찜한순 <img src={'/asset/ChevronDown.svg'} />
                              </span>
                          </div>

                        
                          {activeProductTab === '농수산품' ? (
                            <ProductGridList products={sampleProducts} />
                          ):(
                            <RecipeUserListSection/>
                          )}
                          </div>
                      </>
                    )}
          </div>
          </div>
        </DefaultBody>
        <BottomNav activeIndex={3}></BottomNav>
      </>
    
  );
}
