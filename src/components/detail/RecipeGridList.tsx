// RecipeGridList.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { LuClock3 } from 'react-icons/lu';
import { FiHeart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import { checkAuthAndRedirect } from '@/utils/checkAuthAndRedirect'
import { PostRecipeLike } from '@/api/like/postRecipeLike';
import { useRouter } from 'next/navigation';

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

     const [likes, setLikes] = useState<Record<number, boolean>>({});
  const router = useRouter();
  
    useEffect(() => {
    // 현재 상태와 비교해 동일한 경우 setLikes 생략
    const initialLikes = Object.fromEntries(recipes.map((p) => [p.id, p.isLiked]));
    
    setLikes((prev) => {
      const same = Object.entries(initialLikes).every(
        ([id, liked]) => prev[+id] === liked
      );
      return same ? prev : initialLikes;
    });
  }, [recipes]);



    const requireAuth = checkAuthAndRedirect()
      
    const toggleLike = async (id: number) => {
    if (!requireAuth()) return;

    try {
      await PostRecipeLike(id); // ✅ API 호출// UI optimistic update
      setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
    } catch (error) {
      // 요청 실패 시 상태 롤백
      setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
      console.error('좋아요 요청 실패:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 gap-y-10 px-5 py-4">
      {recipes.map((r) => (
        <div key={r.id} className="flex flex-col" onClick={()=> router.push(`/recipe/details/${r.id}`)}>
          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
            <img
              src={r.image}
              alt={r.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 w-8 h-8">
              <button
                onClick={(e) =>{ e.stopPropagation(); toggleLike(r.id)}}
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
