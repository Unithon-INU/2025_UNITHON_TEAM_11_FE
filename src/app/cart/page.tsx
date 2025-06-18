'use client';

import React, { useState } from 'react';
import Header from '@/components/header/Header';
import CommonButton from '@/components/CommonButton';
import DefaultBody from '@/components/defaultBody';
import { useRouter } from 'next/navigation';

const mockData = [
  {
    farm: '병아리 농장',
    items: [
      {
        id: 1,
        product: '토마토 행사',
        option: '방울토마토',
        price: 6000,
        quantity: 1,
        checked: false,
      },
      {
        id: 2,
        product: '토마토 행사',
        option: '방울토마토',
        price: 6000,
        quantity: 1,
        checked: false,
      },
    ],
  },
  {
    farm: '고릴라 농장',
    items: [
      {
        id: 3,
        product: '토마토 행사',
        option: '방울토마토',
        price: 6000,
        quantity: 2,
        checked: false,
      },
    ],
  },
];

export default function CartPage() {
  const router = useRouter();
  const [farms, setFarms] = useState(mockData);

  const toggleCheck = (id: number) => {
    setFarms((prev) =>
      prev.map((farm) => ({
        ...farm,
        items: farm.items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        ),
      }))
    );
  };

  const updateQuantity = (id: number, amount: number) => {
    setFarms((prev) =>
      prev.map((farm) => ({
        ...farm,
        items: farm.items.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        ),
      }))
    );
  };

  const deleteItem = (id: number) => {
    setFarms((prev) =>
      prev.map((farm) => ({
        ...farm,
        items: farm.items.filter((item) => item.id !== id),
      })).filter((farm) => farm.items.length > 0)
    );
  };

  const toggleAllCheck = () => {
    const allChecked = farms.every((farm) => farm.items.every((item) => item.checked));
    setFarms((prev) =>
      prev.map((farm) => ({
        ...farm,
        items: farm.items.map((item) => ({ ...item, checked: !allChecked })),
      }))
    );
  };

  const selectedItems = farms.flatMap((farm) => farm.items.filter((i) => i.checked));
  const productTotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryTotal = selectedItems.length > 0 ? 3000 : 0;
  const totalPrice = productTotal + deliveryTotal;

  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.Title>장바구니</Header.Title>
      </Header>

      <DefaultBody hasHeader={1}>
        <div className="flex flex-col pb-40 bg-[#F8F7F4]">
          <div className='flex flex-col  px-5'>
            <div className="flex items-center  justify-between py-4 mx-[-20px] bg-white">
              <label className="flex items-center gap-2 text-[15px] font-medium px-5 cursor-pointer">
                <input
                  type="checkbox"
                  id="all-check"
                  className="peer hidden"
                  checked={farms.every((farm) => farm.items.every((item) => item.checked))}
                  onChange={toggleAllCheck}
                />
                <label htmlFor="all-check" className="w-5 h-5 rounded-md border border-[#D9D9D9] bg-white flex items-center justify-center cursor-pointer peer-checked:bg-[#4BE42C]">
                  <img src="/asset/check-white.svg" alt="check" className="w-[14px] h-[14px] " />
                </label>
                전체 선택
              </label>
              <span className="text-[#9F9F9F] text-sm px-5">선택 삭제</span>
            </div>

            <div className="space-y-4 mt-4 ">
              {farms.map((farm) => {
                const selectedFarmItems = farm.items.filter((i) => i.checked);
                const farmProductTotal = selectedFarmItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
                const farmDeliveryTotal = selectedFarmItems.length > 0 ? 3000 : 0;
                const farmTotal = farmProductTotal + farmDeliveryTotal;

                return (
                  <div key={farm.farm} className="bg-white rounded-xl border border-[#F3F0EC] ">
                    <div className="flex items-center justify-between px-4 py-4">
                      <label className="flex items-center gap-2 text-[15px] font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          id={`farm-check-${farm.farm}`}
                          className="peer hidden"
                          checked={farm.items.every((i) => i.checked)}
                          onChange={() => {
                            const allChecked = farm.items.every((i) => i.checked);
                            setFarms((prev) =>
                              prev.map((f) =>
                                f.farm === farm.farm
                                  ? {
                                      ...f,
                                      items: f.items.map((i) => ({ ...i, checked: !allChecked })),
                                    }
                                  : f
                              )
                            );
                          }}
                        />
                        <label htmlFor="all-check" className="w-5 h-5 rounded-md border border-[#D9D9D9] bg-white flex items-center justify-center cursor-pointer peer-checked:bg-[#4BE42C]">
                          <img src="/asset/check-white.svg" alt="check" className="w-[14px] h-[14px] " />
                        </label>
                        {farm.farm}
                      </label>
                    </div>

                    {farm.items.map((item) => (
                      <div key={item.id} className='flex flex-col border-t border-[#F2EEE9] py-4'>
                        <div className="flex items-start gap-3 px-4 py-2">
                          <input
                            type="checkbox"
                            id={`item-check-${item.id}`}
                            className="peer hidden"
                            checked={item.checked}
                            onChange={() => toggleCheck(item.id)}
                            aria-label='check'
                          />
                          <label htmlFor="all-check" className="w-5 h-5 rounded-md border border-[#D9D9D9] bg-white flex items-center justify-center cursor-pointer peer-checked:bg-[#4BE42C]">
                            <img src="/asset/check-white.svg" alt="check" className="w-[14px] h-[14px] " />
                          </label>
                          <img
                            src="/asset/tomato.svg"
                            alt={item.product}
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="text-[16px] font-medium text-[#222222]">{item.product}</div>
                            <div className="text-[14px] text-[#9F9F9F]">{farm.farm}</div>
                          </div>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="text-[#C2C2C2] text-xl"
                          >
                            ✕
                          </button>
                        </div>

                        <div className='ml-13 mr-5'>
                          <div className="mt-2 w-full text-[13px] text-[#222222] border border-[#ddd] rounded-lg px-4 py-3 inline-block">
                            {item.option}
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 border border-[#DFD7CF] rounded-full text-[15px] text-[#666]"
                            >
                              -
                            </button>
                            <div className="w-7 h-7 border border-[#DFD7CF] rounded text-center flex items-center justify-center">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 border border-[#DFD7CF] rounded-full text-[15px] text-[#222]"
                            >
                              +
                            </button>
                            <div className="ml-auto text-[15px] font-semibold text-[#222]">
                              {(item.price * item.quantity).toLocaleString()}원
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-center text-[14px] mb-1 mt-5">
                      <span className="text-[#999]">상품 {farmProductTotal.toLocaleString()}원 + 배송비 {farmDeliveryTotal.toLocaleString()}원 = </span>
                      <div className='text-[#222]'>{farmTotal.toLocaleString()}원</div>
                    </div>
                    <p className="text-[12px] text-center text-[#BEBEBE] mb-3">10,000원 이상 구매 시 무료배송</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DefaultBody>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] bg-[#FFFDFB] p-4 [box-shadow:0px_-1px_4px_0px_#00000008] rounded-[12px]">
        <CommonButton type="button" disabled={selectedItems.length === 0} animate={selectedItems.length > 0}>
          구매하기
        </CommonButton>
      </div>
    </>
  );
}
