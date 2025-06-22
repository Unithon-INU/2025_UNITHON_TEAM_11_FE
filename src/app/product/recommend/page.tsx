'use client';
import RecipeTitle from '../../../components/detail/RecipeTitle';
import RecipeSortSelector from '../../../components/detail/RecipeSortSelector';
import ProductGridList from '@/components/detail/ProductGridList';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import { useUser } from '@/context/UserContext';
import { useState, useEffect } from 'react';
import { GetBestProduct } from '@/api/product/getBestProduct';


export default function RecommendProductPage() {


useEffect(() => {
      const fetchProduct = async () => {
        try {
          const res = await GetBestProduct();
          setProduct(res);
        } catch (error) {
          console.error('상품 데이터 로딩 실패:', error);
        }
      };
  
      fetchProduct();
    }, []);

  const { userInfo } = useUser();
  const [product, setProduct] = useState([]);

  return (
    <>
      <Header>
        <Header.BackButton />
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col ">
          <main className="flex flex-col items-start mt-[24px] px-4 ">
            <div className="px-5  text-[22px] font-semibold leading-[30px] tracking-[-0.03em] text-[#222] mb-8">
            <div>현재 <span className="text-[#4BE42C]">추천하는</span> 농수산물을</div>

            <span className="">{userInfo.nickname || '고객'}</span>
            님에게 알려드려요! <br />
            </div>
            <RecipeSortSelector />
            <ProductGridList products={product}/>
          </main>
        </div>
      </DefaultBody>
    </>
  );
}
