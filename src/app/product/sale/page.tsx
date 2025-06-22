'use client';
import RecipeSortSelector from '@/components/detail/RecipeSortSelector';
import ProductGridList from '@/components/detail/ProductGridList';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import { useUser } from '@/context/UserContext';
import { useState } from 'react';



export default function SaleProductPage() {

    const dummyProducts = [
  {
    id: 1,
    name: '유기농 계란',
    price: 8700,
    salePrice: 6090,
    image: '/asset/egg1.svg',
    isLiked: true,
  },
  {
    id: 2,
    name: '진짜 계란',
    price: 8700,
    salePrice: 6090,
    image: '/asset/egg2.png',
    isLiked: false,
  },
  {
    id: 3,
    name: '신선한 계란',
    price: 8700,
    salePrice: 6090,
    image: '/asset/egg1.png',
    isLiked: true,
  },
  {
    id: 4,
    name: '무항생제 계란',
    price: 8700,
    salePrice: 6090,
    image: '/asset/egg2.png',
    isLiked: false,
  },
];


  const { userInfo } = useUser();
  const [product, setProduct] = useState(dummyProducts);

  return (
    <>
      <Header>
        <Header.BackButton />
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col ">
          <main className="flex flex-col items-start mt-[24px] px-4 ">
            <div className="px-5  text-[22px] font-semibold leading-[30px] tracking-[-0.03em] text-[#222] mb-8">
            <div>현재 <span className="text-[#4BE42C]">특가 행사</span>중인 농수산물을</div>

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
