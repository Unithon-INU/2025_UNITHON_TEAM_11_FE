'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/header/Header';
import CommonButton from '@/components/CommonButton';
import DefaultBody from '@/components/defaultBody';
import DefaultInput from '@/components/DefaultInput';
import { useMarket } from '@/context/MarketContext';
import { useRouter } from 'next/navigation';
import DefaultFileInput from '@/components/DefaultFileInput';
import { GetRegistNum } from '@/api/mypage/getRegistNum';

export default function SaleApplyInfoPage() {
 
  const router = useRouter();
  const [RegistNum, setRegistNum] = useState('');
  const [RegistFile, setRegistFile] = useState<File | null>(null);
  const [Passbook, setPassbook] = useState<File | null>(null);
  const [certifidoc, setCertifidoc] = useState<File | null>(null);
  const [ registNumOk, setRegistNumOk] = useState(false)
  const [ registNumCheckMessage, setRegistNumCheckMessage] = useState('');
  const isFilled = RegistNum  && Passbook && certifidoc;
  const { setMarketInfo } = useMarket();

 
  const handleRegistNumCheck = async () => {
     try {
       await GetRegistNum(RegistNum);
       setRegistNumOk(true);
       setRegistNumCheckMessage('사용가능한 번호입니다');
     } catch (error) {
       setRegistNumOk(false);
       setRegistNumCheckMessage('등록된 번호입니다');
     }
   };

  const handleSave = () => {
    setMarketInfo( prev=> ({ 
      ...prev,
      registNum:RegistNum,
      RegistFile: RegistFile,
      Passbook:Passbook,
      certifidoc:certifidoc,
    })   
    );
    console.log('업데이트됨');
    router.push('/sale-apply/bank')
  };

  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.Title>입점 신청</Header.Title>
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col  ">
          {/* 본문 영역 */}
          <main className="flex flex-col items-center mt-[24px]">
            <h1 className="flex flex-col font-pretendard font-normal text-[20px] leading-[135%] tracking-[-0.03em] mb-[32px] w-full max-w-[350px] ">
              <span>
                <span className='font-pretendard font-semibold text-[20px] leading-[135%] tracking-[-0.03em]'>입점에 필요한 서류와 정보를 </span>
                <br/>
                 입력해주세요.
              </span>
            </h1>
            
        <div className="flex w-full max-w-[350px]  flex-col  jusgap-2">
            <p className='mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]'>사업자 등록번호 혹은 농가확인번호</p>
          <DefaultInput
                type="text"
                placeholder="사업자 등록번호 혹은 농가확인번호 입력"
                value={RegistNum}
                onChange={e => setRegistNum(e.target.value)}
                showCheckButton={true}
                onCheck={handleRegistNumCheck}
                />{registNumCheckMessage && (
                            <p className={`mt-2 font-pretendard text-[13px] leading-[135%] tracking-[-0.03em] ${registNumOk ? 'text-[#4BE42C]' : 'text-[#FF6B2C]'}`}>
                                {registNumCheckMessage}
                            </p>
                            )}
            <div className='mt-2'></div>
            <DefaultFileInput
                id="regist-file"
                value={RegistFile?.name || ''}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setRegistFile(file);
                }}
                />

            <p className="mt-8 mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]">통장 사본</p>
            
            <DefaultFileInput
                id="passbook-file"
                value={Passbook?.name || ''}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPassbook(file);
                }}
                />
                

            <p className="mt-8 mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]">농산물 인증 서류</p>
            
            <DefaultFileInput
                id="certifidoc-file"
                value={certifidoc?.name || ''}
                 onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setCertifidoc(file);
                }}
                />

             
         
            {/* 하단 버튼 영역 */}
             <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[372px] bg-[#FFFDFB]  p-4 [box-shadow:0px_-1px_4px_0px_#00000008] rounded-[12px]">
                <CommonButton
                    type="button"
                    disabled={!isFilled}    
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
