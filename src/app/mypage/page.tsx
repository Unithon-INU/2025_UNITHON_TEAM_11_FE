'use client';

import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import BottomNav from '@/components/BottonNav';


export default function MyPage() {

   

  return (
    <>
      <Header>
        <Header.Title>마이페이지</Header.Title>
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col ">
          <main className="flex flex-col w-full text-[#222] text-[15px] px-5 gap-6">

          {/* 상단 유저 정보 */}
          <div className="flex items-center gap-4 pt-6">
            <img
              src="/sample/profile.jpg"
              alt="프로필"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex flex-col justify-start text-sm">
              <p className="text-[#222222] text-[13px] mb-[-3px]">안녕하세요,</p>
              <p className="text-[20px] font-semibold">핑크솔트님!</p>
              <button className="text-xs underline text-[#5E5E5E] text-start mt-1">프로필 수정</button>
            </div>
            <div className="ml-auto">
              <img src="/asset/chevronRight.svg" alt=">" className="w-6 h-6" />
            </div>
          </div>

          {/* 주요 메뉴 */}
          <div className="grid grid-cols-3 bg-[#F2EEE9] rounded-[8px] py-4 text-center text-[13px] text-[#5E5E5E] font-medium">
            <div className="flex flex-col items-center gap-2">
              <img src="/asset/order.svg" className="w-6 h-6" />
              <span>주문 내역</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img src="/asset/eye.svg" className="w-6 h-6" />
              <span>최근 본 상품</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img src="/asset/review.svg" className="w-6 h-6" />
              <span>리뷰</span>
            </div>
          </div>

          {/* 나의 활동 */}
          <div>
            <p className="text-[14px] text-[#9F9F9F] font-semibold mb-3">나의 활동</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 text-[16px] text-[#222222] font-semibold">
              <span>댓글 내역</span>
              <span>문의 내역</span>
              <span>상품 리뷰</span>
              <span>레시피 리뷰</span>
            </div>
          </div>

          {/* 입점 신청 */}
          <div className="text-[16px]  font-semibold  text-[#222222] border-t-8 border-[#F6F3EE] pt-3">
            <div className="pt-3">입점 신청</div>
          </div>

          {/* 설정 관련 */}
          <div className="border-t-8 border-[#F6F3EE] pt-3">
            <div className="flex justify-between py-3 items-center text-[16px]  font-semibold  text-[#222222] ">
              <span>비밀번호 변경</span>
            </div>
           
            <div className="pt-3 text-[16px]  font-semibold  text-[#222222]">고객센터</div>
          </div>

          {/* 하단 */}
          <div className="border-t-8 border-[#F6F3EE] pt-3 pb-10 text-[16px]  font-semibold  text-[#222222]">
            <div className="py-3">로그아웃</div>
            <div className="py-2">회원탈퇴</div>
          </div>
        </main>

        </div>
      </DefaultBody>

       <BottomNav activeIndex={4}></BottomNav>
    </>
  );
}
