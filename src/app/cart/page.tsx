'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/header/Header';
import CommonButton from '@/components/CommonButton';
import DefaultBody from '@/components/defaultBody';
import { useRouter } from 'next/navigation';
import { PutCart } from '@/api/cart/putCart';
import { GetCart } from '@/api/cart/getCart';
import { Cart } from '@/types/Cart';
import { getAccessToken } from '@/utils/tokenStorage';
import { useOrderContext } from '@/context/OrderContext';

export default function CartPage() {
  const router = useRouter();
  const [farms, setFarms] = useState<any[]>([]);
  const originalCartRef = useRef<Cart[]>([]);
  const [hasAccessToken, setHasAccessToken] = useState(true);
  const { setItems } = useOrderContext();

  useEffect(() => {
    const fetchCart = async () => {
      const token = getAccessToken();
      if (!token) {
        setHasAccessToken(false);
        return;
      }

      try {
        const response = await GetCart();

        // ✅ 각 item에 checked: false 초기화
        const farmsWithChecked = response.groups.map((farm: any) => ({
          ...farm,
          items: farm.items.map((item: any) => ({
            ...item,
            checked: false,
          })),
        }));

        setFarms(farmsWithChecked);

        const flat = farmsWithChecked.flatMap((farm: any) =>
          farm.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            productOption: item.productOption,
          }))
        );
        originalCartRef.current = flat;
      } catch (err) {
        console.error('장바구니 불러오기 실패:', err);
      }
    };

    fetchCart();
  }, []);

   const handleOrder = () => {
    const orderItems = farms.flatMap((farm) =>
    farm.items
      .filter((item: any) => item.checked)
      .map((item: any) => ({
      productId: item.productId,
      imageUrl: item.imageUrl,
      productName: item.productName,
      sellerName: farm.sellerNickname,
      productOption: item.productOption,
      quantity: item.quantity,
      productPrice: item.productPrice,
    }))
  );

    setItems(orderItems);
    router.push('/order');
  };

  const toggleCheck = (productOption: string) => {
    setFarms((prev) =>
      prev.map((farm) => ({
        ...farm,
        items: farm.items.map((item: any) =>
          item.productOption === productOption ? { ...item, checked: !item.checked } : item
        ),
      }))
    );
  };

  const toggleAllCheck = () => {
    const allChecked = farms.every((farm) => farm.items.every((item: any) => item.checked));
    setFarms((prev) =>
      prev.map((farm) => ({
        ...farm,
        items: farm.items.map((item: any) => ({ ...item, checked: !allChecked })),
      }))
    );
  };

  const toggleFarmCheck = (sellerId: number) => {
    setFarms((prev) =>
      prev.map((farm) => {
        if (farm.sellerId !== sellerId) return farm;
        const allChecked = farm.items.every((item: any) => item.checked);
        return {
          ...farm,
          items: farm.items.map((item: any) => ({ ...item, checked: !allChecked })),
        };
      })
    );
  };

  const updateQuantity = (productId: number, amount: number) => {
    setFarms((prev) =>
      prev.map((farm) => ({
        ...farm,
        items: farm.items.map((item: any) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        ),
      }))
    );
  };

  const deleteItem = (productId: number) => {
    setFarms((prev) =>
      prev
        .map((farm) => ({
          ...farm,
          items: farm.items.filter((item: any) => item.productId !== productId),
        }))
        .filter((farm) => farm.items.length > 0)
    );
  };

  const handleBack = async () => {
    const updatedCart: Cart[] = farms.flatMap((farm) =>
      farm.items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        productOption: item.productOption,
      }))
    );

    const hasChanges = JSON.stringify(updatedCart) !== JSON.stringify(originalCartRef.current);

    if (hasChanges) {
      try {
        await PutCart(updatedCart);
      } catch (err) {
        console.error('장바구니 저장 실패:', err);
      }
    }

    router.back();
  };

  const selectedItems = farms.flatMap((farm) => farm.items.filter((i: any) => i.checked));
  const productTotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryTotal = selectedItems.length > 0 ? 3000 : 0;
  const totalPrice = productTotal + deliveryTotal;

  return (
    <>
      <Header>
        <Header.BackButton onClick={handleBack} />
        <Header.Title>장바구니</Header.Title>
      </Header>

      <DefaultBody hasHeader={1}>
        <div className="flex flex-col pb-40 bg-[#F8F7F4]">
          <div className="flex flex-col px-5">
            {!hasAccessToken ? (
              <div className="w-full h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-6 px-4">
                <div className="text-center text-[#888] text-[16px] font-medium">
                  로그인 후 이용가능한 기능입니다.
                </div>
                <button
                  onClick={() => router.push('/login')}
                  className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#333] transition-all"
                >
                  로그인하러 가기
                </button>
              </div>
            ) : farms.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[60vh] text-[#888] text-[16px] font-medium">
                장바구니가 비어있습니다.
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between py-4 mx-[-20px] bg-white">
                  <label className="flex items-center gap-2 text-[15px] font-medium px-5 cursor-pointer">
                    <input
                      type="checkbox"
                      id="all-check"
                      className="peer hidden"
                      checked={farms.every((farm) => farm.items.every((item: any) => item.checked))}
                      onChange={toggleAllCheck}
                    />
                    <label
                      htmlFor="all-check"
                      className="w-5 h-5 rounded-md border border-[#D9D9D9] bg-white flex items-center justify-center cursor-pointer peer-checked:bg-[#4BE42C]"
                    >
                      <img src="/asset/check-white.svg" alt="check" className="w-[14px] h-[14px]" />
                    </label>
                    전체 선택
                  </label>
                  <span className="text-[#9F9F9F] text-sm px-5">선택 삭제</span>
                </div>

                <div className="space-y-4 mt-4">
                  {farms.map((farm) => {
                    const selectedFarmItems = farm.items.filter((i: any) => i.checked);
                    const farmProductTotal = selectedFarmItems.reduce(
                      (sum: any, i: any) => sum + i.productPrice * i.quantity,
                      0
                    );
                    const farmDeliveryTotal = farmProductTotal >= 10000 ? 0 : 3000;
                    const farmTotal = farmProductTotal + farmDeliveryTotal;

                    return (
                      <div key={farm.sellerId} className="bg-white rounded-xl border border-[#F3F0EC]">
                        <div className="flex items-center justify-between px-4 py-4">
                          <label className="flex items-center gap-2 text-[15px] font-semibold cursor-pointer">
                            <input
                              type="checkbox"
                              id={`farm-check-${farm.sellerId}`}
                              className="peer hidden"
                              checked={farm.items.every((i: any) => i.checked)}
                              onChange={() => toggleFarmCheck(farm.sellerId)}
                            />
                            <label
                              htmlFor={`farm-check-${farm.sellerId}`}
                              className="w-5 h-5 rounded-md border border-[#D9D9D9] bg-white flex items-center justify-center cursor-pointer peer-checked:bg-[#4BE42C]"
                            >
                              <img src="/asset/check-white.svg" alt="check" className="w-[14px] h-[14px]" />
                            </label>
                            {farm.sellerNickname}
                          </label>
                        </div>

                        {farm.items.map((item: any) => (
                          <div key={`${item.productOption}-${item.productId}`} className="flex flex-col border-t border-[#F2EEE9] py-4">
                            <div className="flex items-start gap-3 px-4 py-2">
                              <input
                                type="checkbox"
                                id={`item-check-${item.productOption}-${item.productId}`}
                                className="peer hidden"
                                checked={item.checked}
                                onChange={() => toggleCheck(item.productOption)}
                                aria-label="check"
                              />
                              <label
                                htmlFor={`item-check-${item.productOption}-${item.productId}`}
                                className="w-5 h-5 rounded-md border border-[#D9D9D9] bg-white flex items-center justify-center cursor-pointer peer-checked:bg-[#4BE42C]"
                              >
                                <img src="/asset/check-white.svg" alt="check" className="w-[14px] h-[14px]" />
                              </label>
                              <img
                                src={item.imageUrl}
                                alt={item.productName}
                                className="w-14 h-14 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <div className="text-[16px] font-medium text-[#222222]">{item.productName}</div>
                                <div className="text-[14px] text-[#9F9F9F]">{farm.sellerNickname}</div>
                              </div>
                              <button
                                onClick={() => deleteItem(item.productId)}
                                className="text-[#C2C2C2] text-xl"
                              >
                                ✕
                              </button>
                            </div>

                            <div className="ml-13 mr-5">
                              <div className="mt-2 w-full text-[13px] text-[#222222] border border-[#ddd] rounded-lg px-4 py-3 inline-block">
                                {item.productOption}
                              </div>

                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  onClick={() => updateQuantity(item.productId, -1)}
                                  className="w-7 h-7 border border-[#DFD7CF] rounded-full text-[15px] text-[#666]"
                                >
                                  -
                                </button>
                                <div className="w-7 h-7 border border-[#DFD7CF] rounded text-center flex items-center justify-center">
                                  {item.quantity}
                                </div>
                                <button
                                  onClick={() => updateQuantity(item.productId, 1)}
                                  className="w-7 h-7 border border-[#DFD7CF] rounded-full text-[15px] text-[#222]"
                                >
                                  +
                                </button>
                                <div className="ml-auto text-[15px] font-semibold text-[#222]">
                                  {(item.productPrice * item.quantity).toLocaleString()}원
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="flex justify-center text-[14px] mb-1 mt-5">
                          <span className="text-[#999]">
                            상품 {farmProductTotal.toLocaleString()}원 + 배송비 {farmDeliveryTotal.toLocaleString()}원 =
                          </span>
                          <div className="text-[#222]">{farmTotal.toLocaleString()}원</div>
                        </div>
                        <p className="text-[12px] text-center text-[#BEBEBE] mb-3">10,000원 이상 구매 시 무료배송</p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </DefaultBody>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] bg-[#FFFDFB] p-4 [box-shadow:0px_-1px_4px_0px_#00000008] rounded-[12px]">
        <CommonButton type="button" disabled={selectedItems.length === 0} animate={selectedItems.length > 0} onClick={handleOrder}>
          구매하기
        </CommonButton>
      </div>
    </>
  );
}
