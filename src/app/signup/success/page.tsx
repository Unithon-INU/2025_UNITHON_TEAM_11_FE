'use client';
import React, { useState } from 'react';
import CommonButton from '@/components/CommonButton';
import DefaultBody from '@/components/defaultBody';
import DefaultInput from '@/components/DefaultInput';
import { useRouter } from 'next/navigation';

export default function SignUpSuccessPage() {
 
  const [nickname, setNickname] = useState('');
  const [intro, setIntro] = useState('');
  const router = useRouter();

  return (
    <>
      <DefaultBody hasHeader={0}>
        <div className="flex flex-col h-full justify-center items-center">
          {/* 본문 영역 */}
          <main className="flex flex-col h-full items-center justify-center mt-[35vh]">
           
            
        <div className="flex w-full max-w-[350px] h-full flex-col  justify-center jusgap-2">
          

         <img src={'/asset/sprout.svg'} alt='sprout' className='flex w-[30.21px] self-center'></img>
         <p className='flex self-center font-pretendard  font-semibold text-[24px] leading-[135%] text-center tracking-[-0.03em] text-[#222222] '>핑크솔트123님,</p>
         <p className='flex self-center font-pretendard  font-normal text-[24px] leading-[135%] text-center tracking-[-0.03em] text-[#222222] '>환영합니다!</p>
         <p className='flex  self-center font-pretendard font-medium text-[14px] leading-[135%] text-center tracking-[-0.03em] text-[#9F9F9F] '>프링과 함께 농수산물 직거래, 레시피 서비스로 <br/> 지역 경제 활성화 함께해요!</p>
            {/* 하단 버튼 영역 */}
             <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[372px] bg-[#FFFDFB]  p-4 [box-shadow:0px_-1px_4px_0px_#00000008] rounded-[12px]">
                <CommonButton
                    type="button"
                    onClick={()=>router.push('/main')}
                    >
                        시작하기
                </CommonButton>
            </div>
        </div> 
        </main>
        </div>
      </DefaultBody>
    </>
  );
}
