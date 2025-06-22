'use client';

import React, { useRef } from 'react';

interface DefaultFileInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  id: string;
}

export default function DefaultFileInput({
  value,
  onChange,
  label = '파일 찾아보기',
  id,
}: DefaultFileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative w-full flex items-center">
      {/* 표시 영역 */}
      <div
        className={`w-full h-12 px-4 pr-24 rounded-[8px] border border-[#DFD7CF] bg-white flex items-center text-sm font-pretendard truncate ${
          value ? 'text-[#222]' : 'text-[#9F9F9F]'
        }`}
      >
        {value || '파일 업로드'}
      </div>

      {/* 숨겨진 실제 input */}
      <input
        id={id}
        ref={fileInputRef}
        type="file"
        onChange={onChange}
        className="hidden"
      />

      {/* 트리거 버튼 */}
      <button
        type="button"
        onClick={handleClick}
        className="absolute right-2 h-8 px-[12px] flex items-center justify-center rounded-[6px] bg-[#817468] border border-[#DFD7CF] text-[#FFFDFB] text-[12px] font-pretendard font-medium cursor-pointer hover:bg-[#9b8c7e] transition"
      >
        {label}
      </button>
    </div>
  );
}
