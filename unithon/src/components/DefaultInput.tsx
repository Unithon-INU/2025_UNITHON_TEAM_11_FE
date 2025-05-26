import React from 'react';

interface DefaultInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  autoComplete?: string;
}

export default function DefaultInput({
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}: DefaultInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="w-full h-12 px-4 rounded-[8px] border border-[#DFD7CF] border-[1px] bg-white placeholder:text-[#bdbdbd] font-pretendard font-medium text-[14px] leading-[100%] tracking-[-0.03em]
 focus:outline-none"
    />
  );
}
