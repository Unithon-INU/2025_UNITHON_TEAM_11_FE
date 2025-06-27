'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Influencer } from '@/types/Influencer';

type Props = {
  users?: Influencer[];
  isHeader?: boolean;
};



const RecipeUserListSection = ({ users=[], isHeader }: Props) => {
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const initialLikes = Object.fromEntries(
      users.map((user) => [user.memberId, user.isLiked])
    );
    setIsLiked(initialLikes);
  }, [users]);

  const toggleLike = (id: number) => {
    setIsLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="px-4 w-full">
      {isHeader && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[18px] font-semibold text-[#222]">레시피 유저 둘러보기</h2>
          <button className="text-[14px] text-[#9F9F9F] flex gap-1 flex-row">
            추천순 <img src={'/asset/ChevronDown.svg'} />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-5">
        {users.map((user) => (
          <div key={user.memberId} className="flex items-center justify-between">
            <div className="flex items-center gap-3 py-2">
              <Image
                src={user.imageUrl}
                alt={user.nickname}
                width={48}
                height={48}
                className="rounded-full w-12 h-12"
              />
              <div className="text-sm">
                <div className="font-semibold text-[#222]">{user.nickname}</div>
                <div className="text-[#666] text-[13px]">{user.introduction}</div>
              </div>
            </div>
            <Image
              src={isLiked[user.memberId] ? '/asset/heartBtnA.svg' : '/asset/heart.svg'}
              alt="like"
              width={24}
              height={24}
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(user.memberId);
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeUserListSection;
