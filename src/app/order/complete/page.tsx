'use client';

import React, { useEffect } from 'react';
import DefaultBody from '@/components/defaultBody';
import { useRouter } from 'next/navigation';
import { usePurchaseResult } from '@/context/PurchaseResultContext';

export default function OrderCompletePage() {
  const router = useRouter();
  const { result } = usePurchaseResult();

  useEffect(() => {
    if (!result) {
      router.replace('/');
    }
  }, [result]);

  if (!result) return null;

  return (
    <div className="relative">
      <DefaultBody hasHeader={0}>
        <main className="flex flex-col bg-white">
          {/* Header */}
          <div className="flex justify-between items-center p-4">
            <h2 className="text-[18px] font-semibold">주문 완료</h2>
            <button className="text-[20px] text-[#222222]" onClick={() => router.push('/')}>✕</button>
          </div>

            <div className='bg-[#F6F3EE]'>
            {/* 주문 완료 텍스트 */}
            <div className=" px-4 py-6">
                <p className="text-[20px]  mb-1"><span className='font-semibold'>주문이 완료</span>되었어요.</p>
                <p className="text-[14px] text-[#9F9F9F]"><span className='text-[#5E5E5E]'>5일</span> 이내로 배송될 예정이에요!</p>
            </div>

            {/* 주문 상품 */}
            <div className="px-4 pt-6 pb-2">
                <h3 className="font-semibold text-[18px] mb-3">주문 상품</h3>
                <div className="flex flex-col bg-white rounded-[8px] p-3 gap-3">
                {result.simplePurchaseResponseDtos.map((item) => (
                        <div key={item.productOption} className="flex flex-col gap-3 py-4">
                        <div className="flex flex-row items-center gap-4">
                            <img src={item.imageUrl} alt="img" className="w-16 h-16 rounded-[4px]" />
                            <div className="flex flex-col">
                            <p className="text-[13px] text-[#9F9F9F]">{item.sellerNickname}</p>
                            <p className="text-[15px] font-semibold mb-1">{item.productName}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center bg-[#F8F7F4] py-[12px] px-4 justify-between">
                            <p className="text-[13px] text-[#5E5E5E]">
                            옵션 <span className="text-[14px] text-[#222222] ml-1">{item.productOption}</span> 수량 {item.quantity}개
                            </p>
                            <div className="text-[15px] font-semibold whitespace-nowrap">
                            {item.price.toLocaleString()}원
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 배송 정보 */}
            <div className="px-4 pt-6 pb-2">
                <h3 className="font-semibold text-[18px]  mb-3">배송 정보</h3>
                <div className=" rounded-[8px] p-3  bg-white text-[15px] leading-[1.6]">
                <p className="font-semibold  text-[16px]">{result.consumerNickname}</p>
                <p>{result.consumerAddress}</p>
                <p>{result.consumerPhoneNumber}</p>
                </div>
            </div>

            {/* 결제 정보 */}
            <div className="px-4 pt-6 pb-12">
                <h3 className="font-semibold text-[18px] mb-3">결제 정보</h3>
                <div className=" rounded-[8px] p-3  bg-white text-[15px] leading-[1.6]">
                <div className="flex justify-between font-semibold text-[16px] mb-2">
                    <span>결제 금액</span>
                    <span className="text-[#4BE42C]">{result.totalPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                    <span>상품 금액</span>
                    <span>{result.productPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                    <span>배송비</span>
                    <span>{result.deliveryFee.toLocaleString()}원</span>
                </div>
                </div>
            </div>
          </div>
        </main>
      </DefaultBody>
    </div>
  );
}
