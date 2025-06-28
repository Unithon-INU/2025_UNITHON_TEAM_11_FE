'use client';

import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import { useState, useEffect, useRef, useCallback } from 'react';
import { GetMyReview } from '@/api/mypage/getMyReview';

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


      if (res.recipeReviews.length < 5 && res.productReviews.length < 5) {
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

  const renderReviewCard = (review: any) => (
    <div
      key={review.reviewId}
      className="bg-white rounded-xl shadow-sm p-4 mb-3 w-full"
    >
      <div className="flex items-center gap-3 mb-2">
        {review.imageUrls?.[0] && (
        <img
          src={review.imageUrls?.[0]}
          alt="리뷰 이미지"
          className="w-16 h-16 rounded-md object-cover"
        />
        )}
        <div className="flex-1">
          
          <div className="text-[#9F9F9F] text-[13px]">
            {review.createdAt || '날짜 없음'}
          </div>
          <div className="mt-1 text-[#FFD600] text-[14px]">
            {'★'.repeat(review.rating)}
            {'☆'.repeat(5 - review.rating)}
          </div>
        </div>
        <div className="text-[#9F9F9F] text-sm flex items-center gap-1">
          ♡ {review.likeCount ?? 0}
        </div>
      </div>
      <div className="text-[14px] text-[#333] mb-3 whitespace-pre-wrap leading-[1.4]">
        {review.content}
      </div>
      {/*<div className="flex gap-2">
        <button className="flex-1 py-2 rounded-md border text-sm font-medium text-[#333]">
          리뷰 수정
        </button>
        <button className="flex-1 py-2 rounded-md border text-sm font-medium text-[#333]">
          리뷰 삭제
        </button>
      </div>*/}
    </div>
  );

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
            {activeTab === '레시피'
              ? recipeReviews.map(review => renderReviewCard(review))
              : productReviews.map(review => renderReviewCard(review))}
            {hasMore && <div ref={observerRef} className="h-10" />}
          </main>
        </div>
      </DefaultBody>
    </>
  );
}
