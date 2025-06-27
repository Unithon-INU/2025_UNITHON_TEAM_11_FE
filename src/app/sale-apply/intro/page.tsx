'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/header/Header';
import CommonButton from '@/components/CommonButton';
import DefaultBody from '@/components/defaultBody';
import DefaultInput from '@/components/DefaultInput';
import { useRouter } from 'next/navigation';
import { PostApply } from '@/api/mypage/postApply';
import { useMarket } from '@/context/MarketContext';

export default function ApplyIntroPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<File | null>(null); // 프로필 이미지 상태 수정
  const [imgPrev, setImgPrev] = useState<string>('');
  const [nickname, setNickname] = useState('');
  const [intro, setIntro] = useState('');
  const isFilled = intro && nickname;
  const { marketInfo, setMarketInfo } = useMarket();
  
   useEffect(() => {
    return () => {
      if (imgPrev) {
        URL.revokeObjectURL(imgPrev);
      }
    };
  }, [imgPrev]);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];
      setProfile(file);
      if (imgPrev) {
        URL.revokeObjectURL(imgPrev);
      }
      setImgPrev(URL.createObjectURL(file));
      console.log(URL.createObjectURL(file));
    }
  };

   const handleApply = async() => {
    setMarketInfo( prev=> ({ 
      ...prev,
      profile:profile,
      imgPrev: imgPrev,
      nickname:nickname,
      intro:intro,
    })   
    );
    console.log('업데이트됨');
     try {
       const response = await PostApply(marketInfo);
       console.log('회원가입 결과:', response);
         alert('회원가입 완료! 다시 로그인해주세요');
         router.push('/login');
     } catch (error: any) {
      console.error("회원가입 실패", error);
       const message = error.response?.data?.message || "회원가입 실패";
       alert(message);
     }
   }

  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.Title>회원가입</Header.Title>
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col  ">
          {/* 본문 영역 */}
          <main className="flex flex-col items-center mt-[24px]">
            <h1 className="flex flex-col font-pretendard font-normal text-[20px] leading-[135%] tracking-[-0.03em] mb-[12px] w-full max-w-[350px] ">
             
              <span>
                <span className='font-pretendard font-semibold text-[20px] leading-[135%] tracking-[-0.03em]'>마켓</span>
                을 소개해주세요!
              </span>
              <div className='font-medium text-[16px] leading-[19px] tracking-tight text-[#222222] flex-none order-1 flex-grow-0 mt-6'>이미지 첨부하기</div>
            </h1>
            
        <div className="flex w-full max-w-[350px]  flex-col  jusgap-2">
          

          <div className='w-[80px] h-[80px] bg-[#F2EEE9] flex justify-center items-center rounded-[8px]'>
            <label htmlFor='profileImgBtn1'>
                <img  className=' w-[20px] h-[20px]' src={imgPrev ? imgPrev : "/asset/camera.svg"} alt='프로필 이미지'></img>
                <input id='profileImgBtn1' type='file' className="hidden" accept='image/*' onChange={handleImageChange} />
            </label>
          </div>

           <p className="mt-[40px] mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]">마켓 이름</p>
                      <DefaultInput
                          type="text"
                          placeholder="마켓 이름 입력"
                          value={nickname}
                          onChange={e => setNickname(e.target.value)}                         
                          />
                          
      
            <p className="flex mt-[32px] mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]">마켓 소개글</p>
              <textarea
                placeholder="마켓에 대해 소개해주세요."
                value={intro}
                onChange={e => setIntro(e.target.value)}
                className='w-full h-[96px] px-4 py-4 resize-none flex felx-start items-start text-start rounded-[8px] border border-[#DFD7CF] bg-white placeholder:text-[#bdbdbd] font-pretendard font-medium text-[14px] leading-[100%] tracking-[-0.03em] focus:outline-none'
                >
                          </textarea>
         
            {/* 하단 버튼 영역 */}
             <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[372px] bg-[#FFFDFB]  p-4 [box-shadow:0px_-1px_4px_0px_#00000008] rounded-[12px]">
                <CommonButton
                    type="button"
                    disabled={!isFilled}    
                    onClick={handleApply}
                    
                    >
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
