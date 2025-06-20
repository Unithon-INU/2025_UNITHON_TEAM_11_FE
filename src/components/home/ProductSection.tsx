'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LikeButton from '../LikeButton';

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
};

const defaultProducts: Product[] = [
  {
    id: 1,
    name: '브로콜리, 500g, 1봉',
    price: 8700,
    salePrice: 4000,
    image: '/asset/broccoli.svg',
    isLiked: true,
  },
  {
    id: 2,
    name: '아보카도, 500g, 1봉',
    price: 8700,
    salePrice: 6090,
    image: '/asset/broccoli.svg',
    isLiked: false,
  },
  {
    id: 3,
    name: '아보카도, 500g, 1봉',
    price: 8700,
    salePrice: 6090,
    image: '/asset/broccoli.svg',
    isLiked: false,
  },
   {
    id: 4,
    name: '아보카도, 500g, 1봉',
    price: 8700,
    salePrice: 6090,
    image: '/asset/broccoli.svg',
    isLiked: false,
  },
];

const ProductSection = ({
  titleAccent = '⏰ 특가',
  titleRest = '농수산물',
  subtitle = '좋은 가격에 살 수 있는 특가 농수산물',
  products = defaultProducts,
}: ProductSectionProps) => {
  const [likes, setLikes] = useState<Record<number, boolean>>(
    Object.fromEntries(products.map((p) => [p.id, p.isLiked]))
  );

  const router = useRouter();

  const toggleLike = (id: number) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full px-4 mt-[56px]">
      {/* 섹션 헤더 */}
      <div className="flex justify-between items-center mb-1 ">
        <div className="font-semibold text-[18px] leading-[125%] tracking-[-0.03em] text-[#222222]">
          <span className="text-[#4BE42C] mr-1">{titleAccent}</span>
          {titleRest}
        </div>
        <button className="text-[13px] text-[#9A9A9A]">더보기 &gt;</button>
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
            <div className="relative w-full aspect-[1/1] rounded-lg overflow-hidden bg-gray-100">
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
