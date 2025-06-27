'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Review from '@/components/market/Review';
import InquirySection from './InquirySection';
import { RawReview } from '@/types/Review';
import { ParamValue } from 'next/dist/server/request/params';

const tabs = ['상품설명', '상품후기', '문의'];

type ProductTabsProps = {
  descriptionImageUrls: string[];
  reviews?: RawReview[];
  rating?: number;
  productId: ParamValue;
};

export default function ProductTabs({
  reviews = [],
  rating,
  descriptionImageUrls,
  productId
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('상품설명');
  const [showAllImages, setShowAllImages] = useState(false);

  const handleToggle = () => {
    setShowAllImages((prev) => !prev);
  };

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
      <div className="text-[14px] text-[#333]">
        {activeTab === '상품설명' && (
          <div>
            {/* 상품 설명 이미지들 */}
            <div className="mt-6 px-4 space-y-4">
              {descriptionImageUrls.slice(0, showAllImages ? descriptionImageUrls.length : 1).map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`상품 이미지 ${index + 1}`}
                  width={500}
                  height={300}
                  className="w-full object-cover border-none rounded-md"
                />
              ))}
            </div>

            {/* 토글 버튼 (이미지가 2개 이상일 때만) */}
            {descriptionImageUrls.length > 1 && (
              <div className="px-5 mt-4">
                <button
                  onClick={handleToggle}
                  className="w-full h-[44px] rounded-full border border-[#DDD] text-[14px] text-[#333]"
                >
                  {showAllImages ? '상품설명 접기 ▲' : '상품설명 펼치기 ▼'}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === '상품후기' && (
          <div>
            <Review reviews={reviews} averageRating={rating} />
          </div>
        )}

        {activeTab === '문의' && (
          <div>
            <InquirySection productId={productId} />
          </div>
        )}
      </div>
    </div>
  );
}
