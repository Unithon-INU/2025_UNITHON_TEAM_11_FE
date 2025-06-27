'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/header/Header'
import DefaultBody from '@/components/defaultBody'
import SearchBar from '@/components/home/SearchBar'
import RecipeGridList from '@/components/detail/RecipeGridList'
import ProductGridList from '@/components/detail/ProductGridList'
import { checkAuthAndRedirect } from '@/utils/checkAuthAndRedirect'
import { useParams, useSearchParams } from 'next/navigation'
import { GetMember } from '@/api/member/getMember'
import { PostMemberLike } from '@/api/like/postMemberLike'

export default function UserProfilePage() {
  const [userData, setUserData] = useState<any>(null)
  const [isLiked, setLiked] = useState(false)
  const [count, setCount] = useState(0)
  const [activeTab, setActiveTab] = useState<'레시피' | '판매 농수산물'>('레시피')
  const requireAuth = checkAuthAndRedirect()
  const { userId } = useParams()
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await GetMember(userId, 0)
        setUserData(res)
        setCount(res.likeCount || 0)
        setLiked(res.isLiked)
      } catch (error) {
        console.error('사용자 데이터 로딩 실패:', error)
      }
    }
    fetchProfile()
  }, [userId])

  const handleToggleLike = async () => {
    if (!requireAuth()) return;

    try {
      await PostMemberLike(userId); // ✅ API 호출
      setLiked((prev) => !prev);
      setCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
    }
  };

  if (!userData) return null

  const isSeller = userData.isSeller

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
              {/* 유저 정보 */}
              <div className="p-4 flex flex-row items-center gap-4">
                <Image
                  src={userData.imageUrl || '/sample/profile.jpg'}
                  alt="프로필"
                  width={60}
                  height={60}
                  className="rounded-full w-15 h-15"
                />
                <div className="flex flex-col">
                  <h2 className="mt-2 text-[16px] font-semibold">{userData.nickname}</h2>
                  <p className="text-[13px] text-[#9F9F9F]">{userData.introduction}</p>
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
                  {count.toLocaleString()}
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
                <SearchBar showCartButton={false} type={activeTab === '레시피'? 'recipe' : 'product'}/>
              </div>

              {/* 콘텐츠 */}
              {isSeller ? (
                <>
                  {activeTab === '레시피' ? (
                    <>
                      <div className="px-4 flex justify-between items-center text-[18px] font-semibold mb-4 mt-6">
                        <span>{userData.recipeCount}개의 레시피</span>
                        <span className="text-[#5E5E5E] text-[15px] font-medium flex flex-row gap-1">
                          추천순 <img src={'/asset/ChevronDown.svg'} />
                        </span>
                      </div>
                      <RecipeGridList recipes={userData.recipes} />
                    </>
                  ) : (
                    <>
                      <div className="px-4 flex justify-between items-center text-[18px] font-semibold mb-4 mt-6">
                        <span>{userData.productCount || 0}개의 상품</span>
                        <span className="text-[#5E5E5E] text-[15px] font-medium flex flex-row gap-1">
                          추천순 <img src={'/asset/ChevronDown.svg'} />
                        </span>
                      </div>
                      <ProductGridList products={userData.products || []} />
                    </>
                  )}
                </>
              ) : (
                <div>
                  <div className="px-4 flex justify-between items-center text-[18px] font-semibold mb-4 mt-6">
                    <span>{userData.recipeCount}개의 레시피</span>
                    <span className="text-[#5E5E5E] text-[15px] font-medium flex flex-row gap-1">
                      추천순 <img src={'/asset/ChevronDown.svg'} />
                    </span>
                  </div>
                  <RecipeGridList recipes={userData.recipes} />
                </div>
              )}
            </div>
          </main>
        </DefaultBody>
      </div>
    </>
  )
}
