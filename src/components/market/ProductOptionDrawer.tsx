'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const options = [
  { label: '단품 계란 15구, 1판', price: 6090, available: true },
  { label: '단품 계란 30구, 1판', price: 6090, available: false },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductOptionDrawer({ isOpen, onClose }: Props) {
  const [selectedOption, setSelectedOption] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false); // ⬅️ 추가됨

  const handleSelect = (label: string) => {
    setSelectedOption(label);
    setQuantity(1);
    setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
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
          className="fixed bottom-0 left-0 right-0 max-w-[500px] h-[70%] mx-auto bg-white rounded-t-2xl z-50 px-4 pt-4 pb-8"
        >
          <div className="w-[40px] h-[4px] bg-gray-300 rounded-full mx-auto mb-4" />

          <h2 className="text-[16px] font-semibold mb-2">상품 옵션</h2>

          {/* 옵션 선택 버튼 */}
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="border rounded-lg p-3 text-[14px] text-[#9F9F9F] cursor-pointer flex justify-between items-center"
          >
            <span className={selectedOption ? 'text-[#222]' : 'text-[#9F9F9F]'}>
              {selectedOption || '상품 옵션을 선택해주세요.'}
            </span>
            <span className="text-[#999]">⌄</span>
          </div>

          {/* 옵션 리스트 (열릴 때만 표시) */}
          {isDropdownOpen && !selectedOption && (
            <div className="mt-2 border rounded-lg divide-y">
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

          {/* 선택 후 수량 조절 */}
          {selectedOption && (
            <div className="mt-4 border rounded-lg px-4 py-3 flex justify-between items-center">
              <div>
                <div className="text-[14px] text-[#222] mb-1 flex justify-between items-center">
                  <span>{selectedOption}</span>
                  <button onClick={() => setSelectedOption('')} className="text-[#999] ml-2">
                    ✕
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-6 h-6 border rounded">-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-6 h-6 border rounded">+</button>
                </div>
              </div>
              <div className="text-[15px] font-semibold text-[#222]">{(6090 * quantity).toLocaleString()}원</div>
            </div>
          )}

          {/* 예상 결제 금액 */}
          {selectedOption && (
            <div className="mt-6">
              <div className="flex justify-between mb-2 text-[14px]">
                <span className="text-[#999]">결제 예상 금액</span>
                <span className="text-[#222] font-semibold text-[16px]">{(6090 * quantity).toLocaleString()}원</span>
              </div>
              <p className="text-[12px] text-[#BEBEBE]">배송비 2,000원</p>

              <div className="mt-4 flex gap-2">
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
