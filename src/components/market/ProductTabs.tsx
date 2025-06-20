'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Review from '@/components/market/Review';
import InquirySection from './InquirySection';

const tabs = ['상품설명', '상품후기', '문의'];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('상품설명');

  return (
    <div>
      {/* 탭 바 */}
      <div className="flex border-b border-[#F0F0F0]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-[14px] py-[10px] text-center 
              ${
                activeTab === tab
                  ? 'text-[#222222] font-semibold border-b-[2px] border-[#222222]'
                  : 'text-[#C2C2C2] font-normal'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 탭별 콘텐츠 */}
      <div className=" text-[14px] text-[#333]">
        {activeTab === '상품설명' && (
          <div>
             {/* 상품 설명 이미지 */}
            <div className="mt-6 px-4">
              <Image
                src="/asset/egg1.svg"
                alt="닭 이미지"
                width={500}
                height={300}
                className="w-full object-cover border-none"
              />
            </div>

            {/* 상품설명 토글 버튼 */}
            <div className="px-5 mt-4">
              <button className="w-full h-[44px] rounded-full border border-[#DDD] text-[14px] text-[#333]">
                상품설명 펼치기 ▼
              </button>
            </div>

          </div>
        )}

        {activeTab === '상품후기' && (
          <div>
            <Review/>
          </div>
        )}

        {activeTab === '문의' && (
          <div>
            <InquirySection />
          </div>
        )}
      </div>
    </div>
  );
}
