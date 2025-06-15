'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/header/Header';
import CommonButton from '@/components/CommonButton';
import DefaultBody from '@/components/defaultBody';
import DefaultInput from '@/components/DefaultInput';
import { GetEmail } from '@/api/getEmail';
import { GetId } from '@/api/getId';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

export default function SignUpInfoPage() {
 
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailOk, setEmailOk] = useState(false);
  const isEmailValid = email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [id, setId] = useState('');
  const [idOk, setIdOk] = useState(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const [IdCheckMessage, setIdCheckMessage] = useState('');

  const isIdValid = id.trim() !== '' && /^[a-zA-Z0-9_]{4,20}$/.test(id);
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const isPwValid = pw.trim() !== '' && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(pw);
  const [pwCheckMessage, setPwCheckMessage] = useState('');
  const [pwCheckOk, setPwCheckOk] = useState(false);
  const isFilled = isEmailValid && isIdValid && idOk && emailOk && pwCheckOk;
  const { setUserInfo } = useUser();

  useEffect(() => {
  if (pwCheck.trim() === '') {
    setPwCheckMessage('');
    setPwCheckOk(false);
    return;
  }
  
  if (pw === pwCheck) {
    setPwCheckMessage('비밀번호가 일치합니다!');
    setPwCheckOk(true);
  } else {
    setPwCheckMessage('비밀번호가 일치하지 않습니다.');
    setPwCheckOk(false);
  }
}, [pw, pwCheck]);

 const handleEmailCheck = async () => {
  if (!isEmailValid) {
    setEmailCheckMessage('올바른 이메일 형식이 아닙니다');
    setEmailOk(false);
    return;
  }
  try {
    await GetEmail(email);
    setEmailOk(true);
    setEmailCheckMessage('사용가능한 이메일 주소입니다');
  } catch (error) {
    setEmailOk(false);
    setEmailCheckMessage('중복된 이메일 주소입니다');
  }
};


 const handleIdCheck = async () => {
  try {
    await GetId(id);
    setIdOk(true);
    setIdCheckMessage('사용가능한 아이디입니다');
  } catch (error) {
    setIdOk(false);
    setIdCheckMessage('중복된 아이디입니다');
  }
};

  const handleSave = () => {
    setUserInfo( prev=> ({ 
      ...prev,
      email:email,
      id: id,
      password:pw})   
    );
    console.log('업데이트됨');
    router.push('/signup/profile')
  };

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
                onCheck={()=>handleEmailCheck()}
                />
                {emailCheckMessage && (
                  <p className={`mt-2 font-pretendard text-[13px] leading-[135%] tracking-[-0.03em] ${emailOk ? 'text-[#4BE42C]' : 'text-[#FF6B2C]'}`}>
                    {emailCheckMessage}
                  </p>
                )}

            <p className="mt-4 mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]">아이디 입력</p>
            <DefaultInput
                type="text"
                placeholder="아이디 입력"
                value={id}
                onChange={e => setId(e.target.value)}
                showCheckButton={true}
                onCheck={()=>handleIdCheck()}
                />
                 {IdCheckMessage && (
                    <p className={`mt-2 font-pretendard text-[13px] leading-[135%] tracking-[-0.03em] ${idOk ? 'text-[#4BE42C]' : 'text-[#FF6B2C]'}`}>
                      {IdCheckMessage}
                    </p>
                  )}

            <p className="mt-[32px] mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]">비밀번호 입력</p>
            <DefaultInput
                type="password"
                placeholder="비밀번호 입력(8자 이상 영문, 숫자 혼용)"
                value={pw}
                onChange={e => setPw(e.target.value)}
                />

                <div className='flex flex-row font-pretendard mt-[8px] mb-[12px] font-medium not-italic text-[13px] leading-[135%] tracking-[-0.03em] text-[#9F9F9F]'>
                    <div className='flex flex-row'>
                        <p className={`flex mr-[5px] ${pw.length >= 8 ? 'text-[#4BE42C]' : 'text-[#9F9F9F]'}`}>8자 이상</p>
                       
                        <svg
                          className="w-[20.3px] h-[19.02px]"
                          viewBox="4 1 20 20"
                          fill="none"
                          stroke={pw.length >= 8 ? "#4BE42C" : "#9F9F9F"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="5 11 9 15 15 7" />
                        </svg>
        
       
                    </div>
                    <div className='flex ml-[8px]'>
                        <p className={`flex mr-[5px] ${/(?=.*[a-zA-Z])(?=.*\d)/.test(pw) ? 'text-[#4BE42C]' : 'text-[#9F9F9F]'}`}>영문, 숫자 혼용</p>
                         <svg
                          className="w-[20.3px] h-[19.02px]"
                          viewBox="4 1 20 20"
                          fill="none"
                          stroke={/(?=.*[a-zA-Z])(?=.*\d)/.test(pw) ? "#4BE42C" : "#9F9F9F"}
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
            {pwCheckMessage && (
              <p className={`mt-2 font-pretendard text-[13px] leading-[135%] tracking-[-0.03em] ${pwCheckOk ? 'text-[#4BE42C]' : 'text-[#FF6B2C]'}`}>
                {pwCheckMessage}
              </p>
            )}
      

         
            {/* 하단 버튼 영역 */}
             <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[372px] bg-[#FFFDFB]  p-4 [box-shadow:0px_-1px_4px_0px_#00000008] rounded-[12px]">
                <CommonButton
                    type="button"
                    disabled={!isFilled}    
                    animate={isFilled}
                    onClick={handleSave}>
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
