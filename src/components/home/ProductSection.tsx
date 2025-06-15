// components/home/ProductSection.tsx

'use client';
import React from 'react';

const products = [
  {
    id: 1,
    name: '브로콜리, 500g, 1통',
    price: 8700,
    salePrice: 6090,
    image: '/asset/broccoli.svg',
  },
  {
    id: 2,
    name: '아보카도, 500g, 1통',
    price: 8700,
    salePrice: 6090,
    image: '/asset/broccoli.svg',
  },
  {
    id: 3,
    name: '아보카도, 500g, 1통',
    price: 8700,
    salePrice: 6090,
    image: '/asset/broccoli.svg',
  },
];

const ProductSection = () => {
  return (
    <section className="w-full px-4 mt-6">
      {/* 섹션 헤더 */}
      <div className="flex justify-between items-center mb-3">
        <div className="text-[15px] font-semibold">
          <span className="text-[#FF5E5E] mr-1">특가</span>농수산물
        </div>
        <button className="text-[13px] text-[#9A9A9A]">더보기 &gt;</button>
      </div>

      {/* 상품 리스트 */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {products.map((product) => (
          <div key={product.id} className="min-w-[140px] shrink-0">
            <div className="relative w-full h-[140px] rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow text-gray-400 text-sm">♡</div>
            </div>
            <div className="mt-2 text-[13px] leading-4 text-gray-800">{product.name}</div>
            <div className="text-[13px] text-gray-400 line-through">
              {product.price.toLocaleString()}원
            </div>
            <div className="text-[14px] font-bold text-[#222222]">
              <span className="text-[#FF5E5E] mr-1">
                {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
              </span>
              {product.salePrice.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
