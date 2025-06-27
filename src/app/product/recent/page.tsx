'use client';

import RecipeTitle from '../../../components/detail/RecipeTitle';
import RecipeSortSelector from '../../../components/detail/RecipeSortSelector';
import ProductGridList from '@/components/detail/ProductGridList';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import { useUser } from '@/context/UserContext';
import { useState, useEffect, useRef, useCallback } from 'react';
import { GetRecentProduct } from '@/api/product/getRecentProduct';

export default function RecentProductPage() {
  const { userInfo } = useUser();
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = async (pageNumber: number) => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const res = await GetRecentProduct(pageNumber);

      // ✅ 이미 불러온 id와 중복 제거
      setProducts(prev => {
        const existingIds = new Set(prev.map(item => item.id));
        const filtered = res.filter(item => !existingIds.has(item.id));
        return [...prev, ...filtered];
      });

      if (res.length < 6) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('상품 데이터 로딩 실패:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts(0);
  }, []);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isFetching) {
        fetchProducts(page);
      }
    },
    [hasMore, isFetching, page]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      threshold: 0.5,
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleIntersect]);

  return (
    <>
      <Header>
        <Header.BackButton />
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col">
          <main className="flex flex-col items-start mt-[24px] px-4">
            <div className="px-5 text-[22px] font-semibold leading-[30px] tracking-[-0.03em] text-[#222] mb-8">
              <span>{userInfo.nickname || '고객'}</span>님이
              <span className="text-[#4BE42C]"> 최근 본 </span>
              <div>농수산물을 알려드려요!</div>
            </div>
            <RecipeSortSelector />
            <ProductGridList products={products} />
            {hasMore && <div ref={observerRef} className="h-10" />}
          </main>
        </div>
      </DefaultBody>
    </>
  );
}
