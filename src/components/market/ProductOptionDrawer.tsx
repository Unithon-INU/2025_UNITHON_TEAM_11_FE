'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import QuantityCounter from '../QuantityCounter';
import { OptionItem } from '@/types/OptionItem';
import { PostCart } from '@/api/cart/PostCart';
import { useRouter } from 'next/navigation';
import { useOrderContext } from '@/context/OrderContext';
type SelectedOption = {
  productId: number;
  optionName: string;
  quantity: number;
  additionalPrice: number;
  imageUrl: string; 
  productName: string;
  sellerNickname: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  options: OptionItem[];
  imageUrl: string; // 이미지 URL
  productName: string; // 상품 이름
  sellerNickname: string; // 판매자 닉네임
};

export default function ProductOptionDrawer({ isOpen, onClose, options, imageUrl, productName, sellerNickname }: Props) {
  const [selectedOptions, setSelectedOptions] = React.useState<SelectedOption[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const router = useRouter();
  const { setItems } = useOrderContext();

  React.useEffect(() => {
    console.log('🔄 selectedOptions 업데이트됨:', selectedOptions);
  }, [selectedOptions]);

  const handleSelect = (optionName: string) => {
    const matched = options.find((opt) => opt.optionName === optionName);
    if (!matched) return;
    if (selectedOptions.some((opt) => opt.optionName === optionName)) return;

    const { productId, additionalPrice} = matched;

    setSelectedOptions((prev) => [
      ...prev,
      {
        productId,
        optionName,
        quantity: 1,
        additionalPrice,
        imageUrl, // 이미지 URL이 없을 경우 빈 문자열
        productName, // 상품 이름이 없을 경우 빈 문자열
        sellerNickname, // 판매자 닉네임이 없을 경우 빈 문자열
       
      },
    ]);
    setIsDropdownOpen(false);
  };

  const totalPrice = selectedOptions.reduce(
    (sum, opt) => sum + opt.quantity * opt.additionalPrice,
    0
  );

  const handleAddToCart = async () => {
    try {
      await Promise.all(
        selectedOptions.map(async (opt) => {
          await PostCart(opt.productId, opt.quantity, opt.optionName);
        })
      );

      const confirmed = window.confirm('장바구니에 상품이 담겼습니다. 장바구니로 이동하시겠습니까?');
      if (confirmed) {
        router.push('/cart');
      }
    } catch (error) {
      console.error('장바구니 담기 실패:', error);
      alert('장바구니 담기에 실패했습니다.');
    }
  };

  /** ✅ handleOrder 추가 */
  const handleOrder = () => {
    if (selectedOptions.length === 0) {
      alert('주문할 상품을 선택해주세요.');
      return;
    }

    const orderItems = selectedOptions.map((item) => ({
      productId: item.productId,
      imageUrl: item.imageUrl ?? '',
      productName: item.productName ?? '',
      sellerName: item.sellerNickname ?? '',
      productOption: item.optionName,
      quantity: item.quantity,
      productPrice: item.additionalPrice,
    }));

    console.log('🛒 주문 데이터:', orderItems);
    setItems(orderItems);
    // 이후 전역 Context 혹은 Router state로 전달하여 /order 페이지에서 사용
    router.push('/order');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(e, info) => {
            if (info.point.y > 100) onClose();
          }}
          className="fixed bottom-0 left-0 right-0 max-w-[500px] h-[70%] mx-auto bg-white rounded-t-2xl z-50 flex flex-col"
        >
          <div className="w-[40px] h-[8px] bg-gray-300 rounded-full mx-auto mt-4 mb-6" />
          <div className="px-4 flex-1 overflow-y-auto">
            <h2 className="text-[18px] font-semibold mb-[16px]">상품 옵션</h2>

            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`border border-[#D9D9D9] rounded-lg p-3 text-[14px] cursor-pointer flex justify-between items-center ${
                isDropdownOpen ? 'border-b-0 rounded-b-none' : ''
              }`}
            >
              <span className="text-[#5E5E5E]">상품 옵션을 선택해주세요.</span>
              <img
                src={isDropdownOpen ? '/asset/ChevronUp.svg' : '/asset/ChevronDown.svg'}
                alt="화살표"
                className="w-4 h-4"
              />
            </div>

            {isDropdownOpen && (
              <div className="border border-[#D9D9D9] rounded-lg rounded-t-none divide-y divide-[#D9D9D9]">
                {options.map((opt) => (
                  <div
                    key={opt.optionName}
                    onClick={() => opt.available && handleSelect(opt.optionName)}
                    className={`flex justify-between items-center px-3 py-3 text-[14px] ${
                      opt.available ? 'text-[#222]' : 'text-[#C2C2C2]'
                    } ${opt.available ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    {opt.optionName}
                    {!opt.available && (
                      <button className="text-[11px] px-2 py-1 border border-[#E5E5E5] rounded-md text-[#999]">
                        재입고 알림
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {selectedOptions.map(({ optionName, quantity, additionalPrice }) => (
              <div key={optionName} className="relative mt-4 border border-[#D9D9D9] rounded-lg px-5 py-4">
                <button
                  onClick={() =>
                    setSelectedOptions((prev) =>
                      prev.filter((opt) => opt.optionName !== optionName)
                    )
                  }
                  className="absolute top-3 right-5 text-[#C2C2C2] text-[18px]"
                >
                  ✕
                </button>
                <div className="text-[13px] text-[#222] mb-4 pr-6">{optionName}</div>
                <div className="flex items-center justify-between">
                  <QuantityCounter
                    quantity={quantity}
                    onIncrease={() =>
                      setSelectedOptions((prev) =>
                        prev.map((opt) =>
                          opt.optionName === optionName
                            ? { ...opt, quantity: opt.quantity + 1 }
                            : opt
                        )
                      )
                    }
                    onDecrease={() =>
                      setSelectedOptions((prev) =>
                        prev.map((opt) =>
                          opt.optionName === optionName
                            ? { ...opt, quantity: Math.max(1, opt.quantity - 1) }
                            : opt
                        )
                      )
                    }
                  />
                  <div className="text-[15px] font-semibold text-[#222]">
                    {(additionalPrice * quantity).toLocaleString()}원
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedOptions.length > 0 && (
            <div className="px-4 pt-4 pb-6">
              <div className="flex justify-between mb-2 text-[14px]">
                <span className="text-[#999]">결제 예상 금액</span>
                <span className="text-[#222] font-semibold text-[16px]">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
              <p className="text-[12px] text-[#BEBEBE] text-end">배송비 2,000원</p>
              <div className="mt-6 flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-[48px] border border-[#222] rounded-xl text-[14px]"
                >
                  장바구니 넣기
                </button>
                <button
                  onClick={handleOrder}
                  className="flex-1 h-[48px] bg-[#4BE42C] rounded-xl text-white text-[14px]"
                >
                  구매하기
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
