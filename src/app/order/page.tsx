'use client'

import React, { useState } from 'react';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProductSection from '@/components/home/ProductSection';
import ProductTabs from '@/components/market/ProductTabs';
import ProductOptionDrawer from '@/components/market/ProductOptionDrawer';

export default function ProductDetailPage() {
   const [collapsed, setCollapsed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("일반 결제");
  const [agreed, setAgreed] = useState(false);

  const orderItems = [
    {
      id: 1,
      farm: "병아리 농장",
      title: "토마토 행사",
      option: "방울토마토",
      quantity: 1,
      price: 6000,
    },
    {
      id: 2,
      farm: "병아리 농장",
      title: "토마토 행사",
      option: "방울토마토",
      quantity: 1,
      price: 6000,
    },
  ];

  const couponDiscount = 1000;
  const deliveryFee = 3000;
  const productTotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const total = productTotal + deliveryFee - couponDiscount;


  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.RightButton>
          <Header.SearchButton />
          <Header.HomeButton />
          <Header.ShareButton />
        </Header.RightButton>
      </Header>

      <div className="relative pb-[80px]">
        <DefaultBody hasHeader={1}>
          <main className="flex flex-col">
             {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-[18px] font-semibold">주문하기</h2>
        <button className="text-[20px] text-[#999]">✕</button>
      </div>

      {/* 배송 정보 */}
      <div className="p-4">
        <p className="font-medium mb-2">배송 정보</p>
        <button className="w-full border border-[#D9D9D9] rounded-lg text-left py-3 px-4 text-[15px] text-[#9F9F9F]">
          선택하기
        </button>
      </div>

      {/* 주문 상품 */}
      <div className="bg-[#F8F7F4] py-3 px-4">
        <div className="flex justify-between items-center mb-3">
          <p className="font-medium">주문 상품 총 {orderItems.length}개</p>
          <button onClick={() => setCollapsed(!collapsed)}>∨</button>
        </div>

        {!collapsed && (
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img src="/asset/tomato.svg" alt="img" className="w-16 h-16 rounded" />
                <div className="flex-1">
                  <p className="text-[13px] text-[#9F9F9F]">{item.farm}</p>
                  <p className="text-[15px] font-semibold mb-1">{item.title}</p>
                  <p className="text-[14px] text-[#5E5E5E] bg-[#FAFAFA] rounded-lg px-4 py-2 inline-block">
                    옵션 {item.option} 수량 {item.quantity}개
                  </p>
                </div>
                <div className="text-[15px] font-semibold whitespace-nowrap">
                  {item.price.toLocaleString()}원
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 할인 */}
      <div className="p-4">
        <p className="mb-2">할인</p>
        <div className="flex justify-between items-center border border-[#D9D9D9] rounded-lg px-4 py-3 text-[14px]">
          <span>쿠폰</span>
          <span className="text-[#00C73C]">{couponDiscount.toLocaleString()}원</span>
        </div>
      </div>

      {/* 결제 수단 */}
      <div className="p-4">
        <p className="mb-2">결제 수단</p>
        <div className="flex gap-4 mb-3">
          {['프링 페이', '계좌 결제', '일반 결제'].map((method) => (
            <label key={method} className="flex items-center gap-2">
              <input
                type="radio"
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
              />
              <span className="text-[14px]">{method}</span>
            </label>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="flex-1 h-[40px] border border-[#D9D9D9] rounded text-[14px]">카드 결제</button>
          <button className="flex-1 h-[40px] border border-[#D9D9D9] rounded text-[14px]">휴대폰 결제</button>
          <button className="flex-1 h-[40px] border border-[#D9D9D9] rounded text-[14px]">무통장</button>
        </div>
      </div>

      {/* 결제 금액 */}
      <div className="bg-[#F8F7F4] p-4">
        <p className="text-[15px] font-semibold mb-2">결제 금액 <span className="text-[#4BE42C]">{total.toLocaleString()}원</span></p>
        <div className="text-[14px] space-y-1">
          <div className="flex justify-between">
            <span className="text-[#9F9F9F]">상품 금액</span>
            <span>{productTotal.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#9F9F9F]">배송비</span>
            <span>{deliveryFee.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      {/* 약관 동의 */}
      <div className="p-4 text-[14px]">
        <label className="flex items-center gap-2 mb-2">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span className="font-medium text-[#333]">주문 내역 확인 및 결제 동의</span>
        </label>
        <div className="text-[#00C73C] flex flex-col gap-1">
          <p>✔ 프링의 약관에 동의합니다. [필수]</p>
          <p>✔ 프링의 필수 필수 약관에 동의합니다. [필수]</p>
          <p>✔ 프링의 필수 약관에 동의합니다. [필수]</p>
        </div>
      </div>
            
          </main>
        </DefaultBody>

        {/* 하단 고정 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 px-4 py-3 max-w-[500px] mx-auto flex items-center gap-2">
           <button
          className={`w-full h-[48px] rounded-xl font-semibold text-[15px] ${agreed ? 'bg-[#4BE42C] text-white' : 'bg-[#eee] text-[#999]'}`}
          disabled={!agreed}
        >
          {total.toLocaleString()}원 결제하기
        </button>
        </div>

        

      </div>
    </>
  );
}
