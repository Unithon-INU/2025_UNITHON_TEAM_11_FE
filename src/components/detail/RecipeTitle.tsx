// RecipeTitle.tsx
'use client';
import React from 'react';
import { useUser } from '@/context/UserContext';

type Props = {
  nickname: string;
};

const RecipeTitle = ({nickname}:Props) => {
  const { userInfo } = useUser();
  return (
    <div className="px-5 py-2 text-[22px] font-semibold leading-[30px] tracking-[-0.03em] text-[#222]">
      <span className="">{nickname || '고객'}</span>
      님을 위한 <br />
      <span className="text-[#4BE42C]">레시피</span>를 추천해드려요!
    </div>
  );
};

export default RecipeTitle;
