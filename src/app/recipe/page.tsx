'use client';
import '@/app/globals.css';
import React, { useState } from 'react';
import DefaultBody from '@/components/defaultBody';
import DefaultInput from '@/components/DefaultInput';
import CommonButton from '@/components/CommonButton';
import { useRouter } from 'next/navigation';
import { PostLogin } from '@/api/postLogin';
import BottomNav from '@/components/BottonNav';

export default function RecipePage() {
 
  const router = useRouter();
  
 
  return (
    <div className='mt-auto mb-auto'>
    <DefaultBody hasHeader={0} >
      <div className="flex flex-col items-center justify-center  w-full h-full bg-[#FFFDFB] ">
       
      </div>
    </DefaultBody>
    <BottomNav activeIndex={2}></BottomNav>
    </div>
  );
}
