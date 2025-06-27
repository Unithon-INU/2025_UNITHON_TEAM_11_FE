'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Review from './RecipeReview';
import ReviewModal from '../review/ReviewModal';
import { RecipeStep } from '@/types/RecipeDetail';
import { RawReview } from '@/types/Review';
import { checkAuthAndRedirect } from '@/utils/checkAuthAndRedirect';

const tabs = ['레시피', '레시피 후기'];

type Props = {
  ingredients: Record<string, string>;
  sauces?: Record<string, string>;
  steps?: RecipeStep[];
  reviews?: RawReview[];
  totalReviewCount?: number;
  rating?: number;
  recentImageUrls?: string[];
  comments?: string[];
  recipeName: string;
  writer: string;
  recipeId: number;
  recipeImg: string;
};

export default function RecipeTabs({
  ingredients,
  sauces,
  steps,
  reviews = [],
  totalReviewCount,
  rating,
  recentImageUrls,
  comments,
  recipeName,
  writer,
  recipeId,
  recipeImg
}: Props) {
  const [activeTab, setActiveTab] = useState('레시피');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const checkAuth = checkAuthAndRedirect(); 

  const handleReviewClick = () => {

    if (checkAuth()) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
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

        {/* 탭 콘텐츠 */}
        <div className="text-[14px] text-[#333]">
          {activeTab === '레시피' && (
            <div>
              {/* 기본 재료 */}
              <section className="mt-8 px-4 py-4 text-sm">
                <div className="flex justify-between items-center mb-[12px] pb-3 border-b-2 border-[#817468]">
                  <h3 className="font-semibold text-[#222] text-[16px]">기본 재료</h3>
                  <span className="text-[13px] text-[#9A9A9A]">(1인분 기준)</span>
                </div>
                <div className="divide-y divide-[#F6F3EE]">
                  {Object.entries(ingredients).map(([name, amount]) => (
                    <div key={name} className="flex items-center justify-between py-3">
                      <span className="text-[#5E5E5E] text-[16px] w-[70px]">{name}</span>
                      <span className="text-[#5E5E5E] text-[16px]">{amount}</span>
                      <button className="px-2 py-1 text-[13px] text-[#222222] border border-[#9F9F9F] rounded-[8px]">
                        장보기
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* 소스 재료 */}
              {sauces && (
                <section className="px-4 py-4 text-sm mt-8">
                  <div className="flex justify-between items-center mb-[12px] pb-3 border-b-2 border-[#817468]">
                    <h3 className="font-semibold text-[#222] text-[16px]">소스 재료</h3>
                    <span className="text-[13px] text-[#9A9A9A]">(1인분 기준)</span>
                  </div>
                  <div className="divide-y divide-[#F6F3EE]">
                    {Object.entries(sauces).map(([name, amount]) => (
                      <div key={name} className="flex items-center justify-between py-3">
                        <span className="text-[#5E5E5E] text-[16px] w-[70px]">{name}</span>
                        <span className="text-[#5E5E5E] text-[16px]">{amount}</span>
                        <button className="px-2 py-1 text-[13px] text-[#222222] border border-[#9F9F9F] rounded-[8px]">
                          장보기
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 조리 순서 */}
              {steps && (
                <section className="border-t-8 border-[#F9F7F3] px-4 py-8 text-sm">
                  <div className="font-semibold text-[16px] text-[#222] mb-4">요리 순서</div>
                  {steps.map((step) => (
                    <div key={step.stepOrder} className="mb-6">
                      <div className="text-[14px] font-medium text-[#4BE42C] mb-2">
                        STEP {step.stepOrder}
                      </div>
                      <div className="text-[14px] text-[#222] mb-2">{step.description}</div>
                      {step.imageUrl && (
                        <img
                          src={step.imageUrl}
                          alt={`step-${step.stepOrder}`}
                          className="rounded-lg w-full"
                        />
                      )}
                    </div>
                  ))}
                </section>
              )}

              {/* 후기 남기기 버튼 */}
              <div className="px-5 mt-4">
                <button
                  className="w-full h-[44px] rounded-full border border-[#DDD] text-[14px] text-[#333]"
                  onClick={handleReviewClick}
                >
                  후기 남기기
                </button>
              </div>
            </div>
          )}

          {activeTab === '레시피 후기' && (
            <div>
              <div className="px-5 mt-4">
                <button
                  className="w-full h-[44px] rounded-full border border-[#DDD] text-[14px] text-[#333]"
                  onClick={handleReviewClick}
                >
                  후기 남기기
                </button>
              </div>
              <Review reviews={reviews} averageRating={rating}/>
            </div>
          )}

          {activeTab === '댓글' && (
            <div className="px-4 py-4 text-[#999] text-sm">댓글 기능 준비 중입니다.</div>
          )}
        </div>

        <div className="w-full h-2 bg-[#F0F0F0] mt-8" />
      </div>

      {/* 후기 작성 모달 */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        writer={writer}
        recipeName={recipeName}
        recipeId={recipeId}
        ImgUrl={recipeImg}
        type="recipe"

      />
    </>
  );
}
