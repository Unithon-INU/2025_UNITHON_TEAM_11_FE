'use client';

import React, {useState} from 'react';
import Image from 'next/image';

type Influencer = {
  id: number;
  rank: number;
  name: string;
  image: string;
  likes: number;
  isLiked: boolean;
};

type Props = {
  influencers?: Influencer[];
};

const dummyInfluencers: Influencer[] = [
  {
    id: 1,
    rank: 1,
    name: '바닥까지긁어먹기',
    image: '/asset/influencer1.png',
    likes: 12345,
    isLiked: true,
  },
  {
    id: 2,
    rank: 2,
    name: '멕시칸상남자',
    image: '/asset/influencer2.png',
    likes: 11345,
    isLiked: false,
  },
  {
    id: 3,
    rank: 3,
    name: '비건의 하루',
    image: '/asset/influencer3.png',
    likes: 8000,
    isLiked: false,
  },
];

const InfluencerRankingSection = ({ influencers = dummyInfluencers }: Props) => {
    const [isLiked, setLikes] = useState<Record<number, boolean>>(
        Object.fromEntries(influencers.map((p) => [p.id, p.isLiked]))
      );
    
    
      const toggleLike = (id: number) => {
        setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
      };

  return (
    <section className="px-4 mt-6 w-full pb-[55px]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[18px] font-semibold text-[#222]">요리 인플루언서 랭킹</h2>
        <button className="text-[14px] text-[#9F9F9F]  flex gap-1 flex-row">일간 <img src={'asset/ChevronDown.svg'}></img></button>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {influencers.map((inf) => (
          <div key={inf.id} className="shrink-0 ">
            <div className="relative w-[128px] h-[144px] rounded-xl  bg-gray-100">
              <Image src={inf.image} alt={inf.name} fill className="object-cover" />
              <div className="absolute top-1 left-1 bg-white rounded-4 text-xs w-[24px] h-[24px] flex items-center justify-center font-bold">
                {inf.rank}
              </div>
              <button className="absolute bottom-1 right-1" 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(inf.id);
                }}>
                <Image
                  src={isLiked[inf.id] ? '/asset/heartBtnA.svg' : '/asset/heartBtn.svg'}
                  alt="like"
                  width={20}
                  height={20}
                />
              </button>
            </div>
            <div className="text-[15px] text-[#222] mt-1 truncate">{inf.name}</div>
            <div className="text-[13px] text-[#9F9F9F]">♥ {inf.likes.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfluencerRankingSection;
