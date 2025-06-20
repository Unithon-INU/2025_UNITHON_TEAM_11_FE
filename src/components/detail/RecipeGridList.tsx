// RecipeGridList.tsx
'use client';
import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { LuClock3 } from 'react-icons/lu';
import { FiHeart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';

export type Recipe = {
  id: number;
  title: string;
  image: string;
  time: string;
  rating: number;
  comment: number;
  isLiked: boolean;
};

type Props = {
  recipes: Recipe[];
};

const RecipeGridList = ({ recipes }: Props) => {

     const [likes, setLikes] = useState<Record<number, boolean>>(
        Object.fromEntries(recipes.map((r) => [r.id, r.isLiked]))
      );

    const toggleLike = (id: number) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-2 gap-3 px-5 py-4">
      {recipes.map((r) => (
        <div key={r.id} className="flex flex-col">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
            <img
              src={r.image}
              alt={r.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 w-8 h-8">
              <button
                onClick={() => toggleLike(r.id)}
                className="absolute bottom-2 right-2"
              >
                {likes[r.id] ? (
                  <AiFillHeart className="text-green-500 text-[32px] font-extralight" />
                ) : (
                  <FiHeart className="text-gray-400 text-[32px] font-extralight" />
                )}
              </button>
            </div>
          </div>

          <div className="text-[14px] text-[#222] mt-2 font-medium leading-[18px] line-clamp-2">
            {r.title}
          </div>

          <div className='flex flex-row gap-2'>
            <div className="flex items-center text-[13px] text-[#9F9F9F] mt-2 ">
                <LuClock3 size={14} className="mr-1" />
                {r.time}
            </div>

            <div className="flex items-center text-[13px] mt-1">
                <AiFillStar size={14} className="text-[#FFD600] mr-1" />
                <span className="text-[#222] font-semibold mr-1">{r.rating}</span>
                <span className="text-[#999]">({r.comment})</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeGridList;
