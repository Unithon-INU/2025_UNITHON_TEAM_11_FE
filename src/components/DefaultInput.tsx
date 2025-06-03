import React from 'react';

interface DefaultInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  autoComplete?: string;
  showCheckButton?: boolean; // 중복확인 버튼 사용 여부
  onCheck?: () => void;      // 중복확인 버튼 클릭 이벤트
  checkButtonLabel?: string; // 버튼 라벨 커스텀 (옵션)
}

export default function DefaultInput({
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  showCheckButton = false,
  onCheck,
  checkButtonLabel = '중복 확인',
}: DefaultInputProps) {
  return (
    <div className="relative w-full flex items-center">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full h-12 px-4 pr-24 rounded-[8px] border border-[#DFD7CF] bg-white placeholder:text-[#bdbdbd] font-pretendard font-medium text-[14px] leading-[100%] tracking-[-0.03em] focus:outline-none"
      />
      {showCheckButton && value && (
        <button
          type="button"
          onClick={onCheck}
          className="absolute right-2 h-8 px-[8px] rounded-[6px] bg-[#817468] border border-[#DFD7CF] text-[#FFFDFB] font-pretendard text-[12px] font-medium transition hover:bg-[#9b8c7e]"
        >
          {checkButtonLabel}
        </button>
      )}
    </div>
  );
}
