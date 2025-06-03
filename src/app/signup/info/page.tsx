'use client';
import React, { useState } from 'react';
import Header from '@/components/header/Header';
import CommonButton from '@/components/CommonButton';
import DefaultBody from '@/components/defaultBody';
import DefaultInput from '@/components/DefaultInput';
const agreementIds = ['terms', 'policy', 'privacy', 'marketing', 'selective'];
const requiredIds = ['terms', 'policy', 'privacy'];

export default function SignUpInfoPage() {
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({
    terms: false,
    policy: false,
    privacy: false,
    marketing: false,
    selective: false,
  });

  const [email, setEmail] = useState('');
  const isEmailValid = email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isEmailFilled = email.trim() !== '';
  const [id, setId] = useState('');
  const isIdValid = id.trim() !== '' && /^[a-zA-Z0-9_]{4,20}$/.test(id);
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const isPwValid = pw.trim() !== '' && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(pw);
    const isFilled = isEmailValid && isIdValid && isPwValid;


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
          <main className="flex flex-col items-center mt-[24px]">
            <h1 className="flex flex-col font-pretendard font-normal text-[20px] leading-[135%] tracking-[-0.03em] mb-[32px] w-full max-w-[350px] ">
              프링에서 사용할 <br />
              <span>
                <span className='font-pretendard font-semibold text-[20px] leading-[135%] tracking-[-0.03em]'>프링님의 정보</span>
                를 입력해주세요.
              </span>
            </h1>
            
        <div className="flex w-full max-w-[350px]  flex-col  jusgap-2">
            <p className='mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]'>이메일 주소</p>
          <DefaultInput
                type="email"
                placeholder="이메일 주소 입력"
                value={email}
                onChange={e => setEmail(e.target.value)}
                showCheckButton={true}

                />

            <p className="mt-4 mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]">아이디 입력</p>
            <DefaultInput
                type="text"
                placeholder="아이디 입력"
                value={id}
                onChange={e => setId(e.target.value)}
                showCheckButton={true}
                />

            <p className="mt-[32px] mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]">비밀번호 입력</p>
            <DefaultInput
                type="password"
                placeholder="비밀번호 입력(8자 이상 영문, 숫자 혼용)"
                value={pw}
                onChange={e => setPw(e.target.value)}
                />

                <div className='flex flex-row font-pretendard mt-[8px] mb-[12px] font-medium not-italic text-[13px] leading-[135%] tracking-[-0.03em] text-[#9F9F9F]'>
                    <div className='flex flex-row'>
                        <p className='flex mr-[5px]'>8자 이상</p>
                       
                        <svg
                          className="w-[20.3px] h-[19.02px]"
                          viewBox="4 1 20 20"
                          fill="none"
                          stroke="#9F9F9F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="5 11 9 15 15 7" />
                        </svg>
        
       
                    </div>
                    <div className='flex ml-[8px]'>
                        <p className='flex mr-[5px]'>영문, 숫자 혼용</p>
                         <svg
                          className="w-[20.3px] h-[19.02px]"
                          viewBox="4 1 20 20"
                          fill="none"
                          stroke="#9F9F9F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="5 11 9 15 15 7" />
                        </svg>
        
                    </div>
                </div>
            <DefaultInput
                type="password"
                placeholder="비밀번호 확인"
                value={pwCheck}
                onChange={e => setPwCheck(e.target.value)}
                />

      

         
            {/* 하단 버튼 영역 */}
             <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[372px] bg-[#FFFDFB]  p-4 [box-shadow:0px_-1px_4px_0px_#00000008] rounded-[12px]">
                <CommonButton
                    type="button"
                    disabled={!requiredChecked}    
                    animate={isFilled}>
                        다음
                </CommonButton>
            </div>
        </div> 
        </main>
        </div>
      </DefaultBody>
    </>
  );
}
