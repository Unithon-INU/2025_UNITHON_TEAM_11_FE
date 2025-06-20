'use client';

import React, { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FiHeart } from 'react-icons/fi';

export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  salePrice: number;
  isLiked: boolean;
};

type ProductGridListProps = {
  products: Product[];
};

export default function ProductGridList({ products }: ProductGridListProps) {
  const [likes, setLikes] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(products.map((p) => [p.id, p.isLiked]))
  );

  const toggleLike = (id: number) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-2 gap-3 px-5 py-6 w-full">
      {products.map((product) => {
        const discountRate = Math.round(
          ((product.price - product.salePrice) / product.price) * 100
        );

        return (
          <div key={product.id} className="flex flex-col">
            {/* 이미지 */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleLike(product.id)}
                className="absolute bottom-2 right-2"
              >
                {likes[product.id] ? (
                  <AiFillHeart className="text-green-500 text-[28px]" />
                ) : (
                  <FiHeart className="text-gray-400 text-[26px]" />
                )}
              </button>
            </div>

            {/* 장바구니 버튼 */}
            <button className="mt-2 py-[10px] text-[13px] font-medium bg-white border border-[#C2C2C2] text-[#222222] rounded-xl">
              장바구니 담기
            </button>

            {/* 상품 이름 */}
            <div className="mt-2 text-[14px] text-[#333333] font-medium truncate">
              {product.name}
            </div>

            {/* 가격 정보 */}
            <div className="text-[13px] text-[#C2C2C2] line-through">
              {product.price.toLocaleString()}원
            </div>
            <div className="text-[14px] font-bold text-[#222222]">
              <span className="text-[#FF5E5E] mr-1">{discountRate}%</span>
              {product.salePrice.toLocaleString()}원
            </div>
          </div>
        );
      })}
    </div>
  );
}
