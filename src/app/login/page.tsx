'use client';
import '@/app/globals.css';
import React, { useState } from 'react';
import DefaultBody from '@/components/defaultBody';
import DefaultInput from '@/components/DefaultInput';
import CommonButton from '@/components/CommonButton';
import { useRouter } from 'next/navigation';
import { PostLogin } from '@/api/postLogin';

export default function LoginPage() {
  const [remember, setRemember] = useState(true);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const isFilled = id.trim() !== '' && pw.trim() !== ''; 
  const router = useRouter();
  
  const handelLogin = async() => {
     try {
        const res = await PostLogin(id,pw);
        console.log(res);
        if(res.data.accessToken){
          const userInfo = {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            userId: res.data.userId,
            profileURL: res.data.imageUrl,
            introduction: res.data.introduction,
            nickname: res.data.nickname,
          };

          Object.entries(userInfo).forEach(([key, value]) => {
            localStorage.setItem(key, String(value));
          });


          router.push('./main');
        }
        
        
      }  catch (error: any) {
      console.error("로그인 실패", error);
      const message = error.response?.data?.message || "로그인 실패";
      alert(message);
    }
  }
  return (
    <div className='mt-auto mb-auto'>
    <DefaultBody hasHeader={0} >
      <div className="flex flex-col items-center justify-center  w-full h-full bg-[#FFFDFB] ">
        {/* 로고/타이틀 */}
        <img src="asset/logo.svg" alt="로고" className="w-[146px] mb-[24px]" />

        {/* 로그인 폼 */}
        <form className=" w-full max-w-[350px] flex flex-col gap-2">
          <DefaultInput
            type="text"
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="아이디 혹은 이메일 주소 입력"
            autoComplete="username"
          />
          <DefaultInput
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="비밀번호 입력"
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between text-[13px] mt-[12px] mb-[52px]">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="accent-[#bdbdbd] w-4 h-4"
              />
              <span className="text-[#bdbdbd]">로그인 정보 저장</span>
            </label>
            <a href="#" className="text-[#bdbdbd]">비밀번호 찾기 &gt;</a>
          </div>

           <CommonButton
                type="button"
                disabled={!isFilled}
                animate={isFilled}
                onClick={()=> handelLogin()}
            >
                로그인하기
            </CommonButton>
        </form>

        {/* 회원가입 */}
        <button className="mt-[24px] mb-[40px] text-[#bdbdbd] text-[15px] underline bg-transparent border-none" onClick={() => router.push('/signup')}>
          이메일로 회원가입
        </button>

        {/* 간편로그인 구분선 */}
        <div className="flex items-center w-full max-w-[350px] mb-[54px]">
          <div className="flex-1 h-px bg-[#eee]" />
          <span className="mx-2 text-[#bdbdbd] text-[13px]">간편로그인</span>
          <div className="flex-1 h-px bg-[#eee]" />
        </div>

        {/* 간편로그인 아이콘(임시 원 3개) */}
        <div className="flex gap-4 mb-[-110px] ">
          <div className="w-8 h-8 rounded-full bg-[#e7dfd7]" />
          <div className="w-8 h-8 rounded-full bg-[#e7dfd7]" />
          <div className="w-8 h-8 rounded-full bg-[#e7dfd7]" />
        </div>
      </div>
    </DefaultBody>
    </div>
  );
}
