'use client';
import React, { useState } from 'react';
import CommonButton from '@/components/CommonButton';
import DefaultBody from '@/components/defaultBody';
import DefaultInput from '@/components/DefaultInput';
import { useRouter } from 'next/navigation';

export default function ApplySuccessPage() {
 
  const [nickname, setNickname] = useState('');
  const [intro, setIntro] = useState('');
  const router = useRouter();

  return (
    <>
      <DefaultBody hasHeader={0}>
        <div className="flex flex-col h-full justify-center items-center">
          {/* 본문 영역 */}
          <main className="flex flex-col h-full items-center justify-center mt-[30vh]">
           
            
        <div className="flex w-full max-w-[350px] h-full flex-col  justify-center jusgap-2">
          

         <img src={'/asset/success.svg'} alt='sprout' className='flex w-16 self-center mb-8'></img>
         <p className='flex self-center font-pretendard  font-semibold text-[24px] leading-[135%] text-center tracking-[-0.03em] text-[#222222] '>입점 신청 완료!</p>
         <p className='flex  self-center font-pretendard font-medium text-[14px] leading-[135%] text-center tracking-[-0.03em] text-[#9F9F9F] mt-4'>입점이 승인된 이후부터 판매할 수 있어요!<br/> 승인까지는 최대 7일이 걸립니다.</p>
            {/* 하단 버튼 영역 */}
             <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[372px] bg-[#FFFDFB]  p-4 [box-shadow:0px_-1px_4px_0px_#00000008] rounded-[12px]">
                <CommonButton
                    type="button"
                    onClick={()=>router.push('/main')}
                    >
                        확인
                </CommonButton>
            </div>
        </div> 
        </main>
        </div>
      </DefaultBody>
    </>
  );
}
