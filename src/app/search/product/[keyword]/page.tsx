'use client';

import RecipeTitle from '../../../../components/detail/RecipeTitle';
import RecipeSortSelector from '../../../../components/detail/RecipeSortSelector';
import ProductGridList from '@/components/detail/ProductGridList';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import { useUser } from '@/context/UserContext';
import { useState, useEffect, useRef, useCallback } from 'react';
import { GetSearchProduct } from '@/api/product/getSearchProduct';
import { useParams } from 'next/navigation';
import SearchBar from '@/components/home/SearchBar';

export default function SearchProductPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [nickname, setNickname] = useState('');
  const { keyword } = useParams<{ keyword: string }>();

  const fetchProducts = async (pageNumber: number) => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const res = await GetSearchProduct(keyword, pageNumber);

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
    const nickname = localStorage.getItem('nickname') || '';
        setNickname(nickname);
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
        <Header.Title>검색 결과</Header.Title>
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col">
          <main className="flex flex-col items-start mt-[24px] px-4">
             
            <ProductGridList products={products} />
            {hasMore && <div ref={observerRef} className="h-10" />}
          </main>
        </div>
      </DefaultBody>
    </>
  );
}
