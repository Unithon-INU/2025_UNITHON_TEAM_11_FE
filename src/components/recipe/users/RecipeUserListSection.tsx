'use client';

import React, {useState} from 'react';
import Image from 'next/image';

type RecipeUser = {
  id: number;
  name: string;
  desc: string;
  image: string;
  isLiked: boolean;
};

type Props = {
  users?: RecipeUser[];
};

const dummyUsers: RecipeUser[] = [
  {
    id: 1,
    name: '하루포케',
    desc: '다이어터를 위한 포케 레시피',
    image: '/asset/user1.png',
    isLiked: true,
  },
  {
    id: 2,
    name: '아이와',
    desc: '아이와 함께 만들 수 있는 레시피!',
    image: '/asset/user2.png',
    isLiked: false,
  },
  {
    id: 3,
    name: '장발장',
    desc: '전생에 장발장이었는지 빵을 좋아합니다.',
    image: '/asset/user3.png',
    isLiked: false,
  },
  {
    id: 4,
    name: '요신',
    desc: '안녕하세요 요리의신 요신입니다.',
    image: '/asset/user4.png',
    isLiked: false,
  },
];

const RecipeUserListSection = ({ users = dummyUsers }: Props) => {
     const [isLiked, setLikes] = useState<Record<number, boolean>>(
            Object.fromEntries(users.map((p) => [p.id, p.isLiked]))
          );
        
        
          const toggleLike = (id: number) => {
            setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
          };

  return (
    <section className="px-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[18px] font-semibold text-[#222]">레시피 유저 둘러보기</h2>
        <button className="text-[14px] text-[#9F9F9F] flex gap-1 flex-row">추천순 <img src={'asset/ChevronDown.svg'}></img></button>
      </div>
      <div className="flex flex-col gap-5">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3 py-2">
              <Image
                src={user.image}
                alt={user.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="text-sm">
                <div className="font-semibold text-[#222]">{user.name}</div>
                <div className="text-[#666] text-[13px]">{user.desc}</div>
              </div>
            </div>
            <Image
              src={isLiked[user.id] ? '/asset/heartBtnA.svg' : '/asset/heart.svg'}
              alt="like"
              width={24}
              height={24}
              onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(user.id);
                }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeUserListSection;
