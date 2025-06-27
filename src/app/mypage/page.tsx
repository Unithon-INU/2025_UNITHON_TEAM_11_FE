'use client';

import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import BottomNav from '@/components/BottonNav';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GetMypage } from '@/api/mypage/getMypage'; 
import { getAccessToken } from '@/utils/tokenStorage';

type UserInfo = {
  memberId: number;
  imageUrl: string;
  nickname: string;
  introduction: string;
  isSeller: boolean;
};

export default function MyPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [hasAccessToken, setHasAccessToken] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
       const token = getAccessToken();
            if (!token) {
              setHasAccessToken(false);
              return;
            }

      try {
        const res = await GetMypage();
        setUserInfo(res);
      } catch (err) {
        console.error('마이페이지 정보 가져오기 실패:', err);
      }
    };

    fetchUserInfo();
  }, []);

  
  return (
    <>
      <Header>
        <Header.Title>마이페이지</Header.Title>
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col">
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
            <main className="flex flex-col w-full text-[#222] text-[15px] px-5 gap-6">
              {/* 상단 유저 정보 */}
              <div className="flex items-center gap-4 pt-6">
                <img
                  src={userInfo?.imageUrl || '/sample/profile.jpg'}
                  alt="프로필"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex flex-col justify-start text-sm">
                  <p className="text-[#222222] text-[13px] mb-[-3px]">안녕하세요,</p>
                  <p className="text-[20px] font-semibold">{userInfo?.nickname || '회원님'}!</p>
                  <button className="text-xs underline text-[#5E5E5E] text-start mt-1"
                          onClick={()=> router.push('/profile/edit')}>프로필 수정</button>
                </div>
                <div className="ml-auto">
                  <img src="/asset/chevronRight.svg" alt=">" className="w-6 h-6" onClick={()=> router.push('/mypage/profile')}/>
                </div>
              </div>

              {/* 주요 메뉴 */}
              <div className="grid grid-cols-3 bg-[#F2EEE9] rounded-[8px] py-4 text-center text-[13px] text-[#5E5E5E] font-medium">
                <div className="flex flex-col items-center gap-2" onClick={()=> router.push('/mypage/order')}>
                  <img src="/asset/order.svg" className="w-6 h-6" />
                  <span>주문 내역</span>
                </div>
                <div className="flex flex-col items-center gap-2"
                     onClick={()=> router.push('/product/recent')} >
                  <img src="/asset/eye.svg" className="w-6 h-6" />
                  <span>최근 본 상품</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img src="/asset/review.svg" className="w-6 h-6" />
                  <span>리뷰</span>
                </div>
              </div>

         

              {/* 입점 신청 */}
              {!userInfo?.isSeller && (
                <div className="text-[16px] font-semibold text-[#222222] border-t-8 border-[#F6F3EE] pt-3">
                  <div className="pt-3" onClick={() => router.push('/sale-apply')}>
                    입점 신청
                  </div>
                </div>
              )}

              {/* 설정 관련 */}
              <div className="border-t-8 border-[#F6F3EE] pt-3">
                <div className="flex justify-between py-3 items-center text-[16px] font-semibold text-[#222222]">
                  <span>비밀번호 변경</span>
                </div>
                <div className="pt-3 text-[16px] font-semibold text-[#222222]">고객센터</div>
              </div>

              {/* 하단 */}
              <div className="border-t-8 border-[#F6F3EE] pt-3 pb-10 text-[16px] font-semibold text-[#222222]">
                <div className="py-3" >로그아웃</div>
                <div className="py-2">회원탈퇴</div>
              </div> 
            </main>
          )}
        </div>
      </DefaultBody>

      <BottomNav activeIndex={4}></BottomNav>
    </>
  );
}
