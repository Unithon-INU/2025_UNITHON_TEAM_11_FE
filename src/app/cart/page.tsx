'use client';

import React, { useState } from 'react';
import Header from '@/components/header/Header';
import CommonButton from '@/components/CommonButton';
import DefaultBody from '@/components/defaultBody';
import { useRouter } from 'next/navigation';

const mockData = [
  {
    id: 1,
    farm: '병아리 농장',
    product: '토마토 행사',
    option: '방울토마토',
    price: 6000,
    quantity: 1,
    checked: false,
  },
  {
    id: 2,
    farm: '고릴라 농장',
    product: '토마토 행사',
    option: '방울토마토',
    price: 6000,
    quantity: 2,
    checked: false,
  },
];

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState(mockData);

  const toggleCheck = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const updateQuantity = (id: number, amount: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const totalPrice = items
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.quantity * item.price, 0);

  const hasSelected = items.some((item) => item.checked);

  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.Title>장바구니</Header.Title>
      </Header>

      <DefaultBody hasHeader={1}>
        <div className="flex flex-col px-4 pb-40">
          <div className="flex items-center justify-between py-4">
            <label className="flex items-center gap-2 text-[15px] font-medium">
              <input
                type="checkbox"
                className="w-5 h-5"
                aria-label="전체 선택"
              />
              전체 선택
            </label>
            <span className="text-[#D9D9D9] text-sm">선택 삭제</span>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-[#F3F0EC]">
                <div className="flex items-center justify-between px-4 py-3">
                  <label className="flex items-center gap-2 text-[15px] font-semibold">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-[#4BE42C]"
                      checked={item.checked}
                      onChange={() => toggleCheck(item.id)}
                      aria-label={`${item.farm} 전체 선택`}
                    />
                    {item.farm}
                  </label>
                  <button className="text-[#C2C2C2] text-xl">✕</button>
                </div>

                <div className="flex items-start gap-3 px-4 py-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5 mt-2 accent-[#4BE42C]"
                    checked={item.checked}
                    onChange={() => toggleCheck(item.id)}
                    aria-label={`${item.product} 선택`}
                    title={`${item.product} 선택`}
                  />
                  <img
                    src="/asset/tomato.jpg"
                    alt={item.product}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-[15px] font-medium text-[#222]">
                      {item.product}
                    </div>
                    <div className="text-[13px] text-[#999]">{item.farm}</div>
                    <div className="mt-2 text-[13px] text-[#222] border border-[#ddd] rounded-lg px-2 py-1 inline-block">
                      {item.option}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 border rounded-full text-[15px] text-[#666]"
                        aria-label="수량 감소"
                      >
                        -
                      </button>
                      <div
                        className="w-7 h-7 border rounded text-center flex items-center justify-center"
                        aria-label={`수량: ${item.quantity}`}
                      >
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 border rounded-full text-[15px] text-[#222]"
                        aria-label="수량 증가"
                      >
                        +
                      </button>
                      <div className="ml-auto text-[15px] font-semibold text-[#222]">
                        {(item.price * item.quantity).toLocaleString()}원
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DefaultBody>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[372px] bg-[#FFFDFB] p-4 [box-shadow:0px_-1px_4px_0px_#00000008] rounded-[12px]">
        <CommonButton type="button" disabled={!hasSelected} animate={hasSelected}>
          구매하기
        </CommonButton>
      </div>
    </>
  );
}
