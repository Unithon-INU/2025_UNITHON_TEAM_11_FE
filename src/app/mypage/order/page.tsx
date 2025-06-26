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
        <Header.Title>주문내역</Header.Title>
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
                <SearchBar showCartButton={false}></SearchBar>
             
            </div>
            )}
          </main>
        </DefaultBody>

        {/* 하단 고정 버튼 */}
              <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-2 bg-white border-t border-[#EEE] z-50">
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
