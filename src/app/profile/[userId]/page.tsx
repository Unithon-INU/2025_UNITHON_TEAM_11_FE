'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Header from '@/components/header/Header'
import DefaultBody from '@/components/defaultBody'
import SearchBar from '@/components/home/SearchBar'
import RecipeGridList from '@/components/detail/RecipeGridList'
import ProductGridList from '@/components/detail/ProductGridList' // 판매 농수산물용 (추가 필요)
import { checkAuthAndRedirect } from '@/utils/checkAuthAndRedirect'
import { useParams, useSearchParams } from 'next/navigation'

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
  {
    id: 3,
    title: '다이어트 건강 샐러드',
    image: '/sample/salad.jpg',
    time: '1시간 30분',
    rating: 3.5,
    comment: 5,
    isLiked: false,
  },
  {
    id: 4,
    title: '수제 햄버거',
    image: '/sample/burger.jpg',
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

export default function UserProfilePage() {
  const [isLiked, setLiked] = useState(false)
  const [count, setCount] = useState(0)
  const requireAuth = checkAuthAndRedirect()
  const { userId } = useParams()
  const searchParams = useSearchParams()
  const isSeller = searchParams.get('isSeller') === 'true'
  const [activeTab, setActiveTab] = useState<'레시피' | '판매 농수산물'>('레시피')

  const handleToggleLike = () => {
    if (!requireAuth()) return

    setLiked((prev) => !prev)
    setCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.RightButton>
          <Header.HeartButton />
          <Header.SearchButton />
          <Header.CartButton />
        </Header.RightButton>
      </Header>

      <div className="relative pb-[80px]">
        <DefaultBody hasHeader={1}>
          <main className="flex flex-col">
            <div className="pb-[40px] px-2">
              {/* 상단 유저 정보 */}
              <div className="p-4 flex flex-row items-center gap-4">
                <Image
                  src="/sample/profile.jpg"
                  alt="프로필"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <h2 className="mt-2 text-[16px] font-semibold">365일 다이어터</h2>
                  <p className="text-[13px] text-[#9F9F9F]">다이어터를 위한 포케 레시피</p>
                </div>
              </div>

              {/* 버튼들 */}
              <div className="flex justify-center gap-2 px-4 mb-8">
                <button
                  className="flex-1 border border-[#D9D9D9] rounded-lg py-2 text-sm text-[#5E5E5E] flex items-center justify-center gap-1"
                  onClick={handleToggleLike}
                >
                  <img
                    src={`${isLiked ? '/asset/heartBtnA.svg' : '/asset/headerHeart.svg'}`}
                    className="w-4 h-4"
                  />
                  1,234
                </button>
                {isSeller && (
                  <button className="flex-1 border border-[#D9D9D9] rounded-lg py-2 text-sm text-[#333]">
                    쿠폰받기
                  </button>
                )}
                <button className="w-[40px] border border-[#D9D9D9] rounded-lg flex items-center justify-center">
                  <Image src="/asset/headerShare.svg" alt="공유" width={24} height={24} />
                </button>
              </div>

              {/* 탭 */}
              {isSeller && (
                <div className="flex justify-center text-sm border-b border-[#F0F0F0]">
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
              )}

              {/* 검색창 */}
              <div className="mx-[-10] mt-4">
                <SearchBar showCartButton={false} />
              </div>

              {/* 콘텐츠 */}
              {isSeller ? (
                <>
                  {activeTab === '레시피' ? (
                    <>
                        <div className="px-4 flex justify-between items-center text-[18px] font-semibold mb-4 mt-6">
                            <span>4개의 레시피</span>
                            <span className="text-[#5E5E5E] text-[15px] font-medium flex flex-row gap-1">
                            추천순 <img src={'/asset/ChevronDown.svg'} />
                            </span>
                        </div>
                        <RecipeGridList recipes={sampleRecipes} />
                    </>
                  ) : (
                    <>
                        <div className="px-4 flex justify-between items-center text-[18px] font-semibold mb-4 mt-6">
                            <span>4개의 상품</span>
                            <span className="text-[#5E5E5E] text-[15px] font-medium flex flex-row gap-1">
                            추천순 <img src={'/asset/ChevronDown.svg'} />
                            </span>
                        </div>
                        <ProductGridList products={sampleProducts} />
                    </>
                  )}
                </>
              ) : (
                <div>
                  <div className="px-4 flex justify-between items-center text-[18px] font-semibold mb-4 mt-6">
                    <span>4개의 레시피</span>
                    <span className="text-[#5E5E5E] text-[15px] font-medium flex flex-row gap-1">
                      추천순 <img src={'/asset/ChevronDown.svg'} />
                    </span>
                  </div>
                  <RecipeGridList recipes={sampleRecipes} />
                </div>
              )}
            </div>
          </main>
        </DefaultBody>
      </div>
    </>
  )
}
