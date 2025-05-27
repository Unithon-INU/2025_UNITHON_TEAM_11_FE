'use client';
import React, { useState } from 'react';
import Header from '@/components/header/Header';
import AgreementList from '@/components/signup/AgreementList';
import CommonButton from '@/components/CommonButton';
import DefaultBody from '@/components/defaultBody';
import { useRouter } from 'next/navigation';
const agreementIds = ['terms', 'policy', 'privacy', 'marketing', 'selective'];
const requiredIds = ['terms', 'policy', 'privacy'];

export default function SignUpAgreePage() {

  const router = useRouter();

  const [checked, setChecked] = useState<{ [key: string]: boolean }>({
    terms: false,
    policy: false,
    privacy: false,
    marketing: false,
    selective: false,
  });

  const allChecked = agreementIds.every(id => checked[id]);
  const handleToggleAll = (value: boolean) => {
    const next: { [key: string]: boolean } = {};
    agreementIds.forEach(id => { next[id] = value; });
    setChecked(next);
  };

  const handleToggle = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const requiredChecked = requiredIds.every(id => checked[id]);

  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.Title>회원가입</Header.Title>
      </Header>
      <DefaultBody hasHeader={0}>
        <div className="flex flex-col  ">
          {/* 본문 영역 */}
          <main className="flex flex-col items-center mt-[24px] w-full">
            <h1 className="flex  flex-col font-pretendard font-normal text-[20px] max-w-[350px] w-full leading-[135%] tracking-[-0.03em] mb-[32px]">
              원활한 사용을 위해 <br />
              <span>
                <span className='font-pretendard font-semibold text-[20px] leading-[135%] tracking-[-0.03em]'>프링의 이용 약관</span>
                에 동의해주세요.
              </span>
            </h1>
            <div className='flex w-full max-w-[350px] self-center'>
            <AgreementList
              checked={checked}
              onToggle={handleToggle}
              onToggleAll={handleToggleAll}
              allChecked={allChecked}
            />
            </div>
          </main>
          {/* 하단 버튼 영역 */}
          <div className=" fixed  bottom-0 left-1/2 -translate-x-1/2 max-w-[372px] w-full right-0 bg-[#FFFDFB]  p-4 [box-shadow:0px_-1px_4px_0px_#00000008] rounded-[12px]">
            <CommonButton
              type="button"
              disabled={!requiredChecked}
              onClick={() => router.push('/signup/info')}
              
            >
              다음
            </CommonButton>
          </div>
          
        </div>
      </DefaultBody>
    </>
  );
}
