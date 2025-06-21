'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import QuantityCounter from '../QuantityCounter';

const options = [
  { label: '단품 계란 15구, 1판', price: 6090, available: true },
  { label: '단품 계란 30구, 1판', price: 6090, available: true },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductOptionDrawer({ isOpen, onClose }: Props) {
  const [selectedOptions, setSelectedOptions] = React.useState<{ label: string; quantity: number }[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleSelect = (label: string) => {
    if (selectedOptions.some((opt) => opt.label === label)) return;
    setSelectedOptions((prev) => [...prev, { label, quantity: 1 }]);
    setIsDropdownOpen(false);
  };

  const totalPrice = selectedOptions.reduce((sum, opt) => sum + opt.quantity * 6090, 0);

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

            {/* 옵션 선택 버튼 */}
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

            {/* 옵션 리스트 */}
            {isDropdownOpen && (
              <div className="border border-[#D9D9D9] rounded-lg rounded-t-none divide-y divide-[#D9D9D9]">
                {options.map((opt) => (
                  <div
                    key={opt.label}
                    onClick={() => opt.available && handleSelect(opt.label)}
                    className={`flex justify-between items-center px-3 py-3 text-[14px] ${
                      opt.available ? 'text-[#222]' : 'text-[#C2C2C2]'
                    } ${opt.available ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    {opt.label}
                    {!opt.available && (
                      <button className="text-[11px] px-2 py-1 border border-[#E5E5E5] rounded-md text-[#999]">
                        재입고 알림
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 선택된 옵션들 */}
            {selectedOptions.map(({ label, quantity }) => (
              <div key={label} className="relative mt-4 border border-[#D9D9D9] rounded-lg px-5 py-4">
                <button
                  onClick={() =>
                    setSelectedOptions((prev) => prev.filter((opt) => opt.label !== label))
                  }
                  className="absolute top-3 right-5 text-[#C2C2C2] text-[18px]"
                >
                  ✕
                </button>
                <div className="text-[13px] text-[#222] mb-4 pr-6">{label}</div>
                <div className="flex items-center justify-between">
                  <QuantityCounter
                      quantity={quantity}
                      onIncrease={() =>
                        setSelectedOptions((prev) =>
                          prev.map((opt) =>
                            opt.label === label ? { ...opt, quantity: opt.quantity + 1 } : opt
                          )
                        )
                      }
                      onDecrease={() =>
                        setSelectedOptions((prev) =>
                          prev.map((opt) =>
                            opt.label === label
                              ? { ...opt, quantity: Math.max(1, opt.quantity - 1) }
                              : opt
                          )
                        )
                      }
                    />
                  <div className="text-[15px] font-semibold text-[#222]">
                    {(6090 * quantity).toLocaleString()}원
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 고정 결제 영역 */}
          {selectedOptions.length > 0 && (
            <div className=" px-4 pt-4 pb-6">
              <div className="flex justify-between mb-2 text-[14px]">
                <span className="text-[#999]">결제 예상 금액</span>
                <span className="text-[#222] font-semibold text-[16px]">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
              <p className="text-[12px] text-[#BEBEBE] text-end">배송비 2,000원</p>
              <div className="mt-6 flex gap-2">
                <button className="flex-1 h-[48px] border border-[#222] rounded-xl text-[14px]">장바구니 넣기</button>
                <button className="flex-1 h-[48px] bg-[#4BE42C] rounded-xl text-white text-[14px]">구매하기</button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
