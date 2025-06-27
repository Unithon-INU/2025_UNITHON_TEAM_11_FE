'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import RecipeUserListSection from '@/components/recipe/users/RecipeUserListSection';
import { Influencer } from '@/types/Influencer';
import { GetSearchMember } from '@/api/member/getSearchMember';
import { useParams } from 'next/navigation';

export default function SearchUsersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { keyword } = useParams<{ keyword: string }>();

  const fetchRank = async (pageNumber: number) => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);
    try {
      const response = await GetSearchMember(keyword, pageNumber);

      if (response.length === 0) {
        setHasMore(false);
      } else {
        setInfluencers((prev) => {
          const existingIds = new Set(prev.map((item) => item.memberId));
          const filtered = response.filter((item) => !existingIds.has(item.memberId));
          return [...prev, ...filtered];
        });
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error('랭킹 데이터 가져오기 실패:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchRank(0);
  }, [keyword]);

  const handleToggleLike = (id: number) => {
    setInfluencers((prev) =>
      prev.map((inf) =>
        inf.memberId === id ? { ...inf, isLiked: !inf.isLiked } : inf
      )
    );
  };

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isFetching) {
        fetchRank(page);
      }
    },
    [hasMore, isFetching, page, keyword]
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
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
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
          <main className="flex flex-col items-start">
            <RecipeUserListSection
              isHeader={false}
              users={influencers}
            />
            {hasMore && (
              <div ref={observerRef} className="w-full h-10" />
            )}
          </main>
        </div>
      </DefaultBody>
    </>
  );
}
