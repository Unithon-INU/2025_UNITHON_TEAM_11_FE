'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/header/Header'
import DefaultBody from '@/components/defaultBody'
import SearchBar from '@/components/home/SearchBar'
import RecipeGridList from '@/components/detail/RecipeGridList'
import ProductGridList from '@/components/detail/ProductGridList'
import { checkAuthAndRedirect } from '@/utils/checkAuthAndRedirect'
import { GetMember } from '@/api/member/getMember'
import { useRouter } from 'next/navigation'
import { getAccessToken } from '@/utils/tokenStorage';

export default function UserProfilePage() {
  const [userData, setUserData] = useState<any>(null)
  const [isLiked, setLiked] = useState(false)
  const [count, setCount] = useState(0)
  const [activeTab, setActiveTab] = useState<'레시피' | '판매 농수산물'>('레시피')
  const requireAuth = checkAuthAndRedirect()
  const router = useRouter();
  const [hasAccessToken, setHasAccessToken] = useState(true);

  useEffect(() => {
     const token = getAccessToken();
                if (!token) {
                  setHasAccessToken(false);
                  return;
                }
    const userId = localStorage.getItem('userId');

    if (!userId) return;

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
  }, [])


  if (!userData) return null

  const isSeller = userData.isSeller

  return (
    <>
      <Header>
        <Header.BackButton />
        
      </Header>

      <div className="relative pb-[80px]">
        <DefaultBody hasHeader={1}>
          <main className="flex flex-col">
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
            <div className="pb-[40px] px-2">
                
              {/* 유저 정보 */}
              <div className="p-4 flex flex-row items-center justify-between">
                <div className='flex flex-row gap-4'>
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

                 <div
                  className=" rounded-lg py-2 text-sm text-[#9F9F9F] flex flex-col items-center justify-center "
                >
                  <img
                    src={ '/asset/heart.svg'}
                    className="w-6 h-6"
                  />
                  {count.toLocaleString()}
                </div>
              </div>

              {/* 버튼들 */}
              <div className="flex justify-center gap-2 px-4 mb-8">
               
                
                  <button className="flex-1 border border-[#D9D9D9] rounded-lg py-2 text-sm text-[#333]"
                            onClick={()=> router.push('/profile/edit')}>
                    프로필 편집
                  </button>
                
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
                        <span>{userData.recipeCount}개의 레시피</span>
                        <span className="text-[#5E5E5E] text-[15px] font-medium flex flex-row gap-1">
                          최근순 <img src={'/asset/ChevronDown.svg'} />
                        </span>
                      </div>
                      <RecipeGridList recipes={userData.recipes} />
                    </>
                  ) : (
                    <>
                      <div className="px-4 flex justify-between items-center text-[18px] font-semibold mb-4 mt-6">
                        <span>{userData.productCount || 0}개의 상품</span>
                        <span className="text-[#5E5E5E] text-[15px] font-medium flex flex-row gap-1">
                          최근순 <img src={'/asset/ChevronDown.svg'} />
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
                      최근순 <img src={'/asset/ChevronDown.svg'} />
                    </span>
                  </div>
                  <RecipeGridList recipes={userData.recipes} />
                </div>
              )}
            </div>
            )}
          </main>
        </DefaultBody>

        {/* 하단 고정 버튼 */}
              <div className="fixed  bottom-0 left-0 right-0 bg-white border-t border-[#EEE] z-50 flex flex-row justify-center">
                <button className="flex flex-row justify-center items-center px-8 py-4 gap-[10px] w-[168px] h-[50px] absolute left-1/2 -translate-x-[calc(168px/2+8.5px)] 
                                    bottom-[53px]  bg-[#817468] shadow-[0_0_16px_rgba(255,255,255,0.25)] rounded-full text-[14px] text-[#FFFDFB] font-medium" 
                        onClick={()=> {activeTab === '레시피' ? (router.push('/recipe/write')) : (router.push('/product/write')) }}>
                     {activeTab === '레시피' ? ('레시피 업로드하기') : ('상품 업로드하기') }
                </button>
              </div>
      </div>
    </>
  )
}
