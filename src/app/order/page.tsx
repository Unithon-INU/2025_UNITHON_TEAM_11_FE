'use client'

import React, { useState,useEffect } from 'react';
import DefaultBody from '@/components/defaultBody';
import { useRouter } from 'next/navigation';
import { useOrderContext } from '@/context/OrderContext';
import { PostPurchase } from '@/api/product/postPurchase';
import { usePurchaseResult } from '@/context/PurchaseResultContext';

export default function ProductDetailPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("일반 결제");
  const router = useRouter();
  const { setResult } = usePurchaseResult();
  const agreements = [
    { id: 'terms', label: '프링의 약관에 동의합니다.', required: true },
    { id: 'policy', label: '프링의 필수 필수 약관에 동의합니다.', required: true },
    { id: 'privacy', label: '프링의 필수 약관에 동의합니다.', required: true },
  ];

  const [checked, setChecked] = useState<{ [key: string]: boolean }>(() =>
    agreements.reduce((acc, cur) => ({ ...acc, [cur.id]: false }), {})
  );

  const allAgreed = agreements.every(a => checked[a.id]);

  const toggleAgreement = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllAgreements = (value: boolean) => {
    const updated = agreements.reduce((acc, cur) => ({ ...acc, [cur.id]: value }), {});
    setChecked(updated);
  };

  const deliveryFee = 3000;
  const { items } = useOrderContext();
  const productTotal = items.reduce((sum, item) => sum + item.productPrice, 0);
  const total = productTotal + deliveryFee;

   useEffect(() => {
      if (!items) {
        router.replace('/');
      }
    }, [items]);
  
    if (!items) return null;

  const handleSubmitOrder = async () => {
    const payload = {
      items: items.map(item => ({
        productId: item.productId,
        productOption: item.productOption,
        quantity: item.quantity,
        productPrice: item.productPrice,
      })),
      deliveryRequestDto: {
        name: "홍길동",
        phoneNumber: "010-1234-5678",
        zipcode: "12345",
        address: "서울시 강남구 테헤란로",
        addressDetail: "101호",
        deliveryMessage: "문 앞에 두세요"
      },
      paymentMethod,
      productPrice: productTotal,
      deliveryFee,
      totalPrice: total
    };

    try {
      const response = await PostPurchase(payload);
      setResult(response); // 결과 저장
      router.push('/order/complete');
    } catch (error) {
      alert('주문 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <div className="relative pb-[80px]">
        <DefaultBody hasHeader={0}>
          <main className="flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4">
              <h2 className="text-[18px] font-semibold">주문하기</h2>
              <button className="text-[20px] text-[#222222]" onClick={() => router.back()}>✕</button>
            </div>

            {/* 배송 정보 */}
            <div className="p-4">
              <p className="font-semibold text-[18px] mb-2">배송 정보</p>
              <button className="w-full border border-[#D9D9D9] rounded-lg text-left py-3 px-4 text-[15px] text-[#9F9F9F]">
                선택하기
              </button>
            </div>

            {/* 주문 상품 */}
            <div className="py-3">
              <div className="flex justify-between items-center mb-3 border-t-8 border-[#F6F3EE] pt-6">
                <p className="font-semibold text-[18px] px-4">주문 상품 총 {items.length}개</p>
                <img src={collapsed ? '/asset/ChevronUp.svg' : '/asset/ChevronDown.svg'} onClick={() => setCollapsed(!collapsed)} className="w-6 h-6 mr-4" />
              </div>

              {!collapsed && (
                <div className="space-y-4 px-4">
                  {items.map((item) => (
                    <div key={item.productOption} className="flex flex-col gap-3 py-4">
                      <div className="flex flex-row items-center gap-4">
                        <img src={item.imageUrl} alt="img" className="w-16 h-16 rounded-[4px]" />
                        <div className="flex flex-col">
                          <p className="text-[13px] text-[#9F9F9F]">{item.sellerName}</p>
                          <p className="text-[15px] font-semibold mb-1">{item.productName}</p>
                        </div>
                      </div>
                      <div className="flex flex-row items-center bg-[#F8F7F4] py-[12px] px-4 justify-between">
                        <p className="text-[13px] text-[#5E5E5E]">
                          옵션 <span className="text-[14px] text-[#222222] ml-1">{item.productOption}</span> 수량 {item.quantity}개
                        </p>
                        <div className="text-[15px] font-semibold whitespace-nowrap">
                          {item.productPrice.toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 할인 */}
            <div className="p-4 border-t-8 border-[#F6F3EE] py-6">
              <p className="mb-4 font-semibold text-[18px]">할인</p>
              <div className="flex justify-between items-center border border-[#D9D9D9] rounded-lg px-4 py-3 text-[14px]">
                <span>쿠폰</span>
                <span className="text-[#222] flex items-center gap-3">사용 가능 0장 <img src={'/asset/chevronRight.svg'} className="w-4 h-4" /></span>
              </div>
            </div>

            {/* 결제 수단 */}
            <div className="p-4 border-t-8 border-[#F6F3EE] py-6">
              <p className="mb-2 font-semibold text-[18px]">결제 수단</p>
              <div className="flex flex-col gap-4 mb-3">
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
              <div className="flex gap-2 focus:border-[#817468]">
                <button className="flex-1 h-[40px] border border-[#D9D9D9] rounded text-[14px]">카드 결제</button>
                <button className="flex-1 h-[40px] border border-[#D9D9D9] rounded text-[14px]">휴대폰 결제</button>
                <button className="flex-1 h-[40px] border border-[#D9D9D9] rounded text-[14px]">무통장</button>
              </div>
            </div>

            {/* 결제 금액 */}
            <div className="p-4 border-t-8 border-[#F6F3EE] pt-6">
              <p className="text-[18px] font-semibold mb-2 flex justify-between">
                결제 금액 <span className="text-[#4BE42C]">{total.toLocaleString()}원</span>
              </p>
              <div className="text-[14px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#222222]">상품 금액</span>
                  <span>{productTotal.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#222222]">배송비</span>
                  <span>{deliveryFee.toLocaleString()}원</span>
                </div>
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="p-4 text-[15px] border-t-8 border-[#F6F3EE] pt-6">
              <label className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => toggleAllAgreements(!allAgreed)}>
                <input type="checkbox" checked={allAgreed} onChange={(e) => toggleAllAgreements(e.target.checked)} className="w-[20px] h-[20px]" />
                <span className="font-semibold text-[16px]">약관 전체 동의</span>
              </label>
              <ul className="space-y-3">
                {agreements.map(a => (
                  <li key={a.id} className="flex items-center gap-2 cursor-pointer" onClick={() => toggleAgreement(a.id)}>
                    <input
                      type="checkbox"
                      checked={checked[a.id]}
                      onChange={(e) => toggleAgreement(a.id)}
                      onClick={e => e.stopPropagation()}
                      className="w-[18px] h-[18px]"
                    />
                    <span className="text-[15px]">
                      {a.label}
                      <span className="ml-1 text-xs">[{a.required ? '필수' : '선택'}]</span>
                    </span>
                    <button
                      type="button"
                      className="ml-auto text-[13px] underline text-[#D9D9D9]"
                      tabIndex={-1}
                    >
                      보기
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </main>
        </DefaultBody>

        {/* 하단 고정 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 px-4 py-3 max-w-[500px] mx-auto flex items-center gap-2">
          <button
            className={`w-full h-[48px] rounded-xl font-semibold text-[15px] ${allAgreed ? 'bg-[#4BE42C] text-white' : 'bg-[#eee] text-[#999]'}`}
            disabled={!allAgreed}
            onClick={handleSubmitOrder}
          >
            {total.toLocaleString()}원 결제하기
          </button>
        </div>
      </div>
    </>
  );
}
