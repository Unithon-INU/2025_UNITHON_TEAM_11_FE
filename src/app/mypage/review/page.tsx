'use client';

import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import { useState, useEffect, useRef, useCallback } from 'react';
import { GetMyReview } from '@/api/mypage/getMyReview';
import RecipeReviewList from '@/components/recipe/RecipeReviewList';
import ReviewList from '@/components/market/RewiewList';
import { Review } from '@/components/recipe/RecipeReviewList';

export default function MyReviewPage() {
  const [activeTab, setActiveTab] = useState<'레시피' | '상품'>('레시피');

  const [recipeReviews, setRecipeReviews] = useState<any[]>([]);
  const [productReviews, setProductReviews] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchReviews = async (pageNumber: number) => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const res = await GetMyReview(pageNumber);

     setRecipeReviews(prev => {
  const existingIds = new Set(prev.map((item: { reviewId: number }) => item.reviewId));
  const filtered = res.recipeReviews.filter((item: { reviewId: number }) => !existingIds.has(item.reviewId));
  return [...prev, ...filtered];
});

setProductReviews(prev => {
  const existingIds = new Set(prev.map((item: { reviewId: number }) => item.reviewId));
  const filtered = res.productReviews.filter((item: { reviewId: number }) => !existingIds.has(item.reviewId));
  return [...prev, ...filtered];
});


      // 페이지당 5개이므로 5개 미만 수신 시 끝
      if (
        res.recipeReviews.length < 5 &&
        res.productReviews.length < 5
      ) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('리뷰 데이터 로딩 실패:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchReviews(0);
  }, []);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isFetching) {
        fetchReviews(page);
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
        <Header.Title>나의 리뷰</Header.Title>
      </Header>

      <DefaultBody hasHeader={1}>
        <div className="flex flex-col">
          {/* 탭 */}
          <div className="flex w-full justify-center mt-4">
            {['레시피', '상품'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as '레시피' | '상품')}
                className={`px-4 py-2 mx-2 rounded-full text-sm font-semibold ${
                  activeTab === tab
                    ? 'bg-[#222] text-white'
                    : 'bg-[#F2EEE9] text-[#555]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <main className="flex flex-col items-start mt-4 px-4">
            {activeTab === '레시피' ? (
              <RecipeReviewList reviews={recipeReviews} />
            ) : (
              <ReviewList reviews={productReviews} />
            )}
            {hasMore && <div ref={observerRef} className="h-10" />}
          </main>
        </div>
      </DefaultBody>
    </>
  );
}
