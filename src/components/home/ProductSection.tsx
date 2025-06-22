'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LikeButton from '../LikeButton';
import { checkAuthAndRedirect } from '@/utils/checkAuthAndRedirect'
import { PostProductLike } from '@/api/like/postProductLike';

export type Product = {
  id: number;
  name: string;
  price: number;
  salePrice: number;
  image: string;
  isLiked: boolean;
};

type ProductSectionProps = {
  titleAccent?: string;
  titleRest?: string;
  subtitle?: string;
  products?: Product[]; // 외부에서 주입 가능
  onMoreClick?: () => void;

};


const ProductSection = ({
  titleAccent = '⏰ 특가',
  titleRest = '농수산물',
  subtitle = '좋은 가격에 살 수 있는 특가 농수산물',
  products = [],
  onMoreClick,
}: ProductSectionProps) => {
 const [likes, setLikes] = useState<Record<number, boolean>>({});

  useEffect(() => {
  // 현재 상태와 비교해 동일한 경우 setLikes 생략
  const initialLikes = Object.fromEntries(products.map((p) => [p.id, p.isLiked]));
  
  setLikes((prev) => {
    const same = Object.entries(initialLikes).every(
      ([id, liked]) => prev[+id] === liked
    );
    return same ? prev : initialLikes;
  });
}, [products]);



  const router = useRouter();
  const requireAuth = checkAuthAndRedirect()

  const toggleLike = async (id: number) => {
    if (!requireAuth()) return;

    try {
      await PostProductLike(id); // ✅ API 호출// UI optimistic update
      setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
    } catch (error) {
      // 요청 실패 시 상태 롤백
      setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
      console.error('좋아요 요청 실패:', error);
    }
  };

  return (
    <section className="w-full px-4 mt-[56px]">
      {/* 섹션 헤더 */}
      <div className="flex justify-between items-center mb-1 ">
        <div className="font-semibold text-[18px] leading-[125%] tracking-[-0.03em] text-[#222222]">
          <span className="text-[#4BE42C] mr-1">{titleAccent}</span>
          {titleRest}
        </div>
        <button className="text-[13px] text-[#9A9A9A]" onClick={onMoreClick}>더보기 &gt;</button>
      </div>

      {/* 부제목 */}
      <p className="font-medium text-[14px] leading-[125%] tracking-[-0.03em] text-[#9F9F9F] mb-3">
        {subtitle}
      </p>

      {/* 상품 리스트 */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide ">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[140px] shrink-0 cursor-pointer"
            onClick={() => router.push(`/market/details/${product.id}`)}
          >
            <div className="relative w-[135px] aspect-[1/1] rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <LikeButton
                liked={likes[product.id]}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(product.id);
                }}
              />
            </div>

            <div className="flex flex-col items-start text-left mt-2">
              <div className="text-[13px] leading-4 text-[#333333]">
                {product.name}
              </div>
              <div className="text-[13px] text-[#C2C2C2] line-through">
                {product.price.toLocaleString()}원
              </div>
              <div className="text-[14px] font-bold text-[#222222]">
                <span className="text-[#FF5E5E] mr-1">
                  {Math.round(
                    ((product.price - product.salePrice) / product.price) * 100
                  )}
                  %
                </span>
                {product.salePrice.toLocaleString()}원
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
