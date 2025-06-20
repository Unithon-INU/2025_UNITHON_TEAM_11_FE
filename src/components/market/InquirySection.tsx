'use client';

import React from 'react';

const InquirySection = () => {
  return (
    <div className="text-center px-6 pt-14 pb-8 bg-white border-b-8 border-[#F6F3EE]">
      {/* 상단 질문 문구 */}
      <p className="text-[15px] text-[#333333] font-medium mb-16">
        궁금하거나 문의할 내용이 있으신가요?
      </p>

      {/* 판매자 답변 시간 안내 */}
      <div className="text-[13px] text-[#C2C2C2] leading-5 mb-4">
        <p className="mb-[4px]">판매자 답변 가능시간</p>
        <p className='text-[#5E5E5E]'>평일 10:00 ~ 18:00　주말, 공휴일 미운영</p>
      </div>

      {/* 버튼 영역 */}
      <div className="flex flex-col gap-3 items-center">
        <button className="w-full max-w-[350px] h-[44px] border border-[#D9D9D9] rounded-full text-[#222] text-[14px]">
          판매자 문의
        </button>
        <button className="w-full max-w-[350px] h-[44px] border border-[#D9D9D9] rounded-full text-[#222] text-[14px]">
          챗봇 농산물 문의
        </button>
      </div>
    </div>
  );
};

export default InquirySection;
