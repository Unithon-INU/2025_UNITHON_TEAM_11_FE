'use client'

import React, { useState, useEffect } from 'react';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import ProductSection from '@/components/home/ProductSection';
import ProductTabs from '@/components/market/ProductTabs';
import ProductOptionDrawer from '@/components/market/ProductOptionDrawer';
import { GetProductDetail } from '@/api/product/getProductDetail';
import { ProductDetail } from '@/types/ProductDetail';

export default function ProductDetailPage() {
  const router = useRouter();
  const { productId } = useParams();
  const [ product, setProduct ] = useState<ProductDetail>();

  useEffect(() => {
      const fetchProduct = async () => {
        try {
          const res = await GetProductDetail(productId, 0);
          setProduct(res);
        } catch (error) {
          console.error('상품 데이터 로딩 실패:', error);
        }
      };
  
      fetchProduct();
    }, [productId]);

  const rating = 4; // 예시 값 (API 연동 시 동적 할당 가능)
  const reviewCount = 1234;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(3210); // 초기 좋아요 수

  const handleToggleLike = () => {
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  if (!product) return null;
  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.RightButton>
          <Header.SearchButton />
          <Header.HomeButton />
          <Header.ShareButton />
        </Header.RightButton>
      </Header>

      <div className="relative pb-[80px]">
        <DefaultBody hasHeader={1}>
          <main className="flex flex-col">
            {/* 상품 이미지 */}
            <div className="w-[100%] aspect-[1/1] bg-gray-100">
              <img
                src={product.mainImageUrl}
                alt="계란"
                className="w-full object-cover "
              />
            </div>

            {/* 판매처 */}
            <div className="text-[13px] text-[#9F9F9F]  px-[20px] py-[12px] border-b border-[#D9D9D9] box-border">{product.member.nickname} &gt;</div>

           <div className="px-4 py-[24px] ">
                <h1 className="text-[18px] font-semibold text-[#222]">{product.name}</h1>

                {/* 별점 */}
                <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                    <span
                        key={i}
                        className={`text-[14px] ${i <= Math.floor(product.rating) ? 'text-[#FFD600]' : 'text-[#C2C2C2]'}`}
                    >
                        ★
                    </span>
                    ))}
                    <span className="ml-1 text-[14px] text-[#C2C2C2]">({product.totalReviewCount.toLocaleString()})</span>
                </div>

                {/* 가격 */}
                <div className="mt-1">
                    <div className="line-through text-[14px] text-[#C2C2C2]">{product.price}</div>
                    <div className="text-[18px] font-bold text-[#222]">
                    <span className="text-[#FF5E5E] mr-1">{Math.round(
                    ((product.price - product.salePrice) / product.price) * 100
                  )}%</span>
                    {product.salePrice}원
                    </div>
                </div>
            </div>


            <div className="border-t border-[#F6F3EE] px-4 pt-4 pb-3 text-[13px] text-[#666]">
                <div className="flex items-start gap-[8px]">
                    {/* 왼쪽: 라벨 */}
                    <span className="text-[#9F9F9F] w-[70px] shrink-0">배송정보</span>

                    {/* 오른쪽: 배송 정보 내용 */}
                    <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center gap-[6px]">
                        <span className="text-[#222]">{product.deliveryCompany}</span>
                        <span className="text-[#C2C2C2]">|</span>
                        <span className="text-[#C2C2C2]">{product.deliveryFee}원</span>
                    </div>
                    <p className="text-[12px] text-[#C2C2C2] leading-[1.4]">
                        15,000원 이상 구매 시 무료배송
                    </p>
                    <p className="text-[12px] text-[#C2C2C2] leading-[1.4]">
                        주문일 기준 <span className="text-[#222] font-semibold">{product.deliverySchedule}일내</span> 발송
                    </p>
                    </div>
                </div>
            </div>



            {/* 판매자 정보 */}
            <div className="flex items-center justify-between px-4 py-4 border-[#F6F3EE] border-t-8 border-b-8  mt-4">
              <div className="flex items-center gap-2">
                <Image
                  src={product.member.imageUrl}
                  alt="농장 로고"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="text-sm">
                  <div className="font-pretendard font-semibold text-[14px] leading-[17px] tracking-[-0.03em] text-[#222222]">{product.member.nickname}</div>
                  <div className="font-pretendard font-normal text-[14px] leading-[17px] tracking-[-0.03em] text-[#9F9F9F] mt-[4px]">
                    {product.member.introduction}
                  </div>
                </div>
              </div>
                 {/* 별 버튼 */}
                <button
                    onClick={handleToggleLike}
                    className="flex flex-col items-center justify-center"
                >
                    <Image
                    src={liked ? '/asset/star1.svg' : '/asset/star0.svg'}
                    alt="좋아요"
                    width={24}
                    height={24}
                    />
                    <span className="text-[12px] text-[#9F9F9F] mt-[2px]">
                    {product.member.likeCount.toLocaleString()}
                    </span>
                </button>
            </div>

            <ProductSection
                titleAccent=''
                titleRest='연관 농수산품'
                subtitle=''/>

           <div className="mt-6 border-t-8 border-[#F9F7F3] px-4 py-4 mb-[16px]  text-sm">
                {/* 헤더 */}
                <div className="flex justify-between items-center mb-[12px]">
                    <h3 className="font-semibold text-[#222] text-[16px]">상품정보</h3>
                    <button className="text-[13px] text-[#9A9A9A]">더보기 &gt;</button>
                </div>

                {/* 정보 리스트 */}
                <div className="text-[14px] text-[#5E5E5E] space-y-[12px]">
                    {[
                    { label: '요약설명', value: product.description },
                    { label: '총 수량', value: product.totalStock },
                    { label: '상품 무게', value: product.volume },
                    { label: '소비기한', value: product.expirationDate },
                    ].map((item) => (
                    <div key={item.label} className="flex">
                        <span className="w-[80px] text-[#9F9F9F]">{item.label}</span>
                        <span className="text-[#5E5E5E]">{item.value}</span>
                    </div>
                    ))}
                </div>
                </div>


            <ProductTabs/>    

            <ProductSection
                titleAccent=''
                titleRest='인기 많은 농수산품'
                subtitle=''/> 
            
          </main>
        </DefaultBody>

        {/* 하단 고정 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 px-4 py-3 max-w-[500px] mx-auto flex items-center gap-2">
          <button className="w-[48px] h-[48px] flex items-center justify-center rounded-xl border border-[#E5E5E5]">
            <span className="text-[#4BE42C] text-2xl">♡</span>
          </button>
          <button className="flex-1 h-[48px] bg-[#4BE42C] text-white text-[14px] font-medium rounded-xl" onClick={() => setDrawerOpen(true)}>
            구매하기
          </button>
        </div>

        <ProductOptionDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      </div>
    </>
  );
}
