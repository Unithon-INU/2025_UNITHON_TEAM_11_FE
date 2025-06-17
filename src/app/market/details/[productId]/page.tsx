'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/header/Header';
import CommonButton from '@/components/CommonButton';
import DefaultBody from '@/components/defaultBody';
import DefaultInput from '@/components/DefaultInput';
import { GetNickname } from '@/api/getNickname';
import { PostSignup } from '@/api/postSignup';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { profile } from 'console';


export default function ProductDetailPage() {
  const router = useRouter();
 

  return (
    <>
      <Header>
        <Header.BackButton />
        
      </Header>
      <DefaultBody hasHeader={0}>
        <div className="flex flex-col  ">
          {/* 본문 영역 */}
          <main className="flex flex-col items-center mt-[24px]">
            
        </main>
        </div>
      </DefaultBody>
    </>
  );
}
