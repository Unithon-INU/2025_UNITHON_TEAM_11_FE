'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/header/Header';
import CommonButton from '@/components/CommonButton';
import DefaultBody from '@/components/defaultBody';
import DefaultInput from '@/components/DefaultInput';
import { GetNickname } from '@/api/getNickname';
import { useRouter } from 'next/navigation';
import { PutMyProfile } from '@/api/mypage/putMyProfile';

export default function SignUpProfilePage() {
  const router = useRouter();
  const [profileImg, setProfileImg] = useState<File | null>(null); // 프로필 이미지 상태 수정
  const [imgPrev, setImgPrev] = useState<string>('');
  const [nickname, setNickname] = useState('');
  const [intro, setIntro] = useState('');
  const [ nicknameOk, setNicknameOk] = useState(false)
  const [ nicknameCheckMessage, setNicknameCheckMessage] = useState('');
  const isFilled = intro && nicknameOk;


   useEffect(() => {
      const profileURL = localStorage.getItem('profileURL') || '';
    const introduction = localStorage.getItem('introduction') || '';
    const savedNickname = localStorage.getItem('nickname') || '';

    setImgPrev(profileURL);
    setIntro(introduction);
    setNickname(savedNickname);
    setNicknameOk(true); // 기존 닉네임이라면 중복검사 통과한 것으로 처리
    setNicknameCheckMessage('');
    }, []);


   useEffect(() => {
    return () => {
      if (imgPrev) {
        URL.revokeObjectURL(imgPrev);
      }
    };
  }, [imgPrev]);

   const handleNicknameCheck = async () => {
    try {
      await GetNickname(nickname);
      setNicknameOk(true);
      setNicknameCheckMessage('사용가능한 닉네임입니다');
    } catch (error) {
      setNicknameOk(false);
      setNicknameCheckMessage('중복된 닉네임입니다');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];
      setProfileImg(file);
      if (imgPrev) {
        URL.revokeObjectURL(imgPrev);
      }
      setImgPrev(URL.createObjectURL(file));
      console.log(URL.createObjectURL(file));
    }
  };

  const handleEdit = async() => {
    try {
      const response = await PutMyProfile(nickname, intro, profileImg);
      console.log('회원가입 결과:', response);
        alert('프로필 수정 완료!');
        router.back();
    } catch (error: any) {
      console.error("프로필 수정 실패", error);
      const message = error.response?.data?.message || "프로필 수정 실패";
      alert(message);
    }
  }
  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.Title>프로필 수정</Header.Title>
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col  ">
          {/* 본문 영역 */}
          <main className="flex flex-col items-center mt-[40px]">
           
            
        <div className="flex w-full max-w-[350px]  flex-col  jusgap-2">
          

          <div className='w-[80px] h-[80px] self-center'>
            <label htmlFor='profileImgBtn1'>
                <img  className='rounded-full w-[80px] h-[80px]' src={imgPrev ? imgPrev : "/asset/addProfile.svg"} alt='프로필 이미지'></img>
                <input id='profileImgBtn1' type='file' className="hidden" accept='image/*' onChange={handleImageChange} />
            </label>
          </div>

           <p className="mt-[40px] mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]">닉네임</p>
                      <DefaultInput
                          type="text"
                          placeholder="닉네임을 입력해주세요!"
                          value={nickname}
                          onChange={e => setNickname(e.target.value)}
                          onCheck={()=> handleNicknameCheck()}
                          showCheckButton={true}
                          />
                          {nicknameCheckMessage && (
                            <p className={`mt-2 font-pretendard text-[13px] leading-[135%] tracking-[-0.03em] ${nicknameOk ? 'text-[#4BE42C]' : 'text-[#FF6B2C]'}`}>
                                {nicknameCheckMessage}
                            </p>
                            )}
      
            <p className="flex mt-[32px] mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]">소개글</p>
              <textarea
                placeholder="소개글을 입력해주세요!"
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
                    
                    onClick={()=> handleEdit()}
                    >
                        수정하기
                </CommonButton>
            </div>
        </div> 
        </main>
        </div>
      </DefaultBody>
    </>
  );
}
