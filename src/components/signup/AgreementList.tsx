import React from 'react';

interface Agreement {
  id: string;
  label: string;
  required: boolean;
}

const agreements: Agreement[] = [
  { id: 'terms', label: '프링의 약관에 동의합니다.', required: true },
  { id: 'policy', label: '프링의 필수 약관에 동의합니다.', required: true },
  { id: 'privacy', label: '프링의 필수 약관에 동의합니다.', required: true },
  { id: 'marketing', label: '프링의 약관에 동의합니다.', required: false },
  { id: 'selective', label: '프링의 선택 약관에 동의합니다.', required: false },
];

interface AgreementListProps {
  checked: { [key: string]: boolean };
  onToggle: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
  allChecked: boolean;
}

export default function AgreementList({
  checked,
  onToggle,
  onToggleAll,
  allChecked,
}: AgreementListProps) {
  return (
    <div className="flex flex-col w-full max-w-[350px]">
      {/* 전체 동의 */}
      <div
        className={`flex items-center mb-[16px] cursor-pointer rounded-lg transition-colors
        `}
        onClick={() => onToggleAll(!allChecked)}
      >
        <input
          type="checkbox"
          checked={allChecked}
          onChange={e => onToggleAll(e.target.checked)}
          className="appearance-none flex  checked:bg-[#19C419] w-[24px] h-[24px] mr-2 border-none bg-[#DFD7CF] rounded-md peer"
        />
         <span className="
          pointer-events-none
          absolute ml-1
          ">
          
            <svg
              className="w-[29.3px] h-[34.02px]"
              viewBox="4 1 20 20"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="5 11 9 15 15 7" />
            </svg>
        
        </span>
        <span className={`font-pretendard font-semibold text-[16px] leading-[145%] tracking-[-0.03em]`}>
          약관 전체 동의
        </span>
      </div>

      {/* 개별 약관 */}
      <ul className="mt-3 space-y-2 w-full flex flex-col ">
        {agreements.map(a => (
          <li
            key={a.id}
            className={`flex items-center rounded-lg cursor-pointer mb-[12px]
              transition-colors
              
            `}
            onClick={() => onToggle(a.id)}
          >
            <input
              type="checkbox"
              checked={checked[a.id]}
              onChange={e => onToggle(a.id)}
              className="peer appearance-none flex  w-[24px] h-[24px] mr-2 border-none  rounded-md peer"
              onClick={e => e.stopPropagation()}
            />
            <span
                className={`
                    absolute ml-1 pointer-events-none
                    ${checked[a.id] ? 'text-[#19C419]' : 'text-[#DFD7CF]'}
                `}  
            >
          
            <svg
              className={`w-[29.3px] h-[34.02px]  stroke-current ${checked[a.id] ? 'text-[#19C419]' : 'text-[#DFD7CF]'}`}
              viewBox="4 1 20 20"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="5 11 9 15 15 7" />
            </svg>
        
        </span>
            <span className={`flex-2 text-[15px] `}>
              {a.label}
              <span className={`ml-1 text-xs `}>
                [{a.required ? '필수' : '선택'}]
              </span>
            </span>
            <button type="button" className="flex justify-end font-pretendard font-normal text-[13px] leading-[145%] tracking-[-0.03em] underline underline-offset-0 decoration-solid decoration-[0px] text-[#D9D9D9] " tabIndex={-1}>
              보기
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
