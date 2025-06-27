'use client';
import '@/app/globals.css';
import React, { useEffect, useState } from 'react';
import DefaultBody from '@/components/defaultBody';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottonNav';
import MarketCarousel from '@/components/market/MarketCarousel';
import CategoryChips from '@/components/market/CategoryChips';
import ProductSection from '@/components/home/ProductSection';
import SearchBar from '@/components/home/SearchBar';
import BottomBanner from '@/components/market/BottonBanner';
import { useUser } from '@/context/UserContext';
import { GetMainProduct } from '@/api/main/getMainProduct';

export default function MarketPage() {
 
  const router = useRouter();
  const { userInfo } = useUser();
 
  const [product, setProduct] = useState([]);
  const [frequent, setFrequent] = useState([]);

  
    useEffect(() => {
        const fetchMain = async () => {
          try {
            const res = await GetMainProduct();
            console.log(res);
            setProduct(res.bestProductResponseDtos || []);
            setFrequent(res.frequentProductResponseDtos || []);
            
          } catch (error) {
            console.error('메인 데이터 로딩 실패:', error);
          }
        };
    
        fetchMain();
      }, []);

  return (
    <div className='mt-auto mb-auto'>
    <DefaultBody hasHeader={0} >
      <div className="flex flex-col items-center justify-center  w-full h-full bg-[#FFFDFB] ">
        {/* 검색창 */}
          <SearchBar type='product'/>

          {/* 캐러셀 */}
          <MarketCarousel />

          {/* 카테고리 버튼들 */}
          <CategoryChips />

          {/* 추천 농수산물 섹션 */}
          <ProductSection
            titleAccent="🫰 추천"
            titleRest="농수산품"
            subtitle={`${userInfo.nickname || '고객'}님을 위해 추천하는 농수산품이에요.`}
            products={product}
            onMoreClick={()=>{router.push('/product/recommend')}}
          />

          {/* 자주 구매한 농수산품 섹션 */}
          <ProductSection
            titleAccent="🌟 자주 구매한"
            titleRest="농수산품"
            subtitle={`${userInfo.nickname || '고객'}님을 위해 추천하는 농수산품이에요.`}
            products={frequent}
            onMoreClick={()=>{router.push('/product/frequent')}}
          />

          {/* 하단 배너 섹션 */}
          <BottomBanner />


      </div>
    </DefaultBody>
    <BottomNav activeIndex={1}></BottomNav>
    </div>
  );
}
