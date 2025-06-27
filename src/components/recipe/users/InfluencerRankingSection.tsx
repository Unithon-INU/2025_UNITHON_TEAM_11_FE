'use client';

import React from 'react';
import Image from 'next/image';
import { Influencer } from '@/types/Influencer';

type Props = {
  influencers: Influencer[];
  title: string;
  onToggleLike: (id: number) => void;
};

const InfluencerRankingSection = ({ influencers, onToggleLike, title }: Props) => {
  return (
    <section className="px-4 mt-6 w-full pb-[55px]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[18px] font-semibold text-[#222]">{title}</h2>
        <button className="text-[14px] text-[#9F9F9F] flex gap-1 flex-row">
          일간 <img src={'/asset/ChevronDown.svg'} />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {influencers.map((inf, index) => (
          <div key={inf.memberId} className="shrink-0">
            <div className="relative w-[128px] h-[144px] rounded-xl bg-gray-100">
              <Image src={inf.imageUrl} alt={inf.nickname} fill className="object-cover" />
              <div className="absolute top-1 left-1 bg-white rounded-4 text-xs w-[24px] h-[24px] flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <button
                className="absolute bottom-1 right-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLike(inf.memberId);
                }}
              >
                <Image
                  src={inf.isLiked ? '/asset/heartBtnA.svg' : '/asset/heartBtn.svg'}
                  alt="like"
                  width={20}
                  height={20}
                />
              </button>
            </div>
            <div className="text-[15px] text-[#222] mt-1 truncate">{inf.nickname}</div>
            <div className="text-[13px] text-[#9F9F9F]">♥ {inf.likeCount.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfluencerRankingSection;