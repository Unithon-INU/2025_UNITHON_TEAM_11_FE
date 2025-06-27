'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelectBank: (bankName: string) => void;
};

export default function BankOptionDrawer({ isOpen, onClose, onSelectBank }: Props) {
  const bankNames = ['농협은행', '카카오뱅크', '하나은행', '토스뱅크', '기업은행', '국민은행'];

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
            <h2 className="text-[18px] font-semibold mb-[16px]">은행 선택</h2>

            {/* 은행 목록 그리드 */}
            <div className="grid grid-cols-3 gap-3">
              {bankNames.map((name, i) => (
                <div
                  key={i}
                  onClick={() => {
                    onSelectBank(name); // ✅ 클릭 시 은행 이름 부모로 전달
                    onClose(); // ✅ 선택 후 닫기
                  }}
                  className="flex flex-col items-center justify-center bg-[#F5F3F1] rounded-lg py-4 cursor-pointer"
                >
                  <img
                    src={`/asset/${name}.png`}
                    alt={name}
                    className="w-[56px] h-[56px] rounded-full"
                  />
                  <span className="mt-2 text-[14px] text-[#444]">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
