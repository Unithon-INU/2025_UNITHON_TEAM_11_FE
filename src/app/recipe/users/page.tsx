'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import SearchBar from '@/components/home/SearchBar';
import RecipeUserListSection from '@/components/recipe/users/RecipeUserListSection';
import InfluencerRankingSection from '@/components/recipe/users/InfluencerRankingSection';
import { GetRank } from '@/api/member/getRank';
import { Influencer } from '@/types/Influencer';

export default function RecipeUsersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const response = await GetRank();
        setInfluencers(response);
      } catch (error) {
        console.error('랭킹 데이터 가져오기 실패:', error);
      }
    };

    fetchRank();
  }, []);

  const handleToggleLike = (id: number) => {
    setInfluencers((prev) =>
    prev.map((inf) =>
      inf.memberId === id ? { ...inf, isLiked: !inf.isLiked } : inf
    )
  );
  };

  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.Title>레시피 유저 둘러보기</Header.Title>
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col">
          <main className="flex flex-col items-start">
            <SearchBar showCartButton={false} />
            <InfluencerRankingSection
              influencers={influencers.slice(0, 5)}
              onToggleLike={handleToggleLike}
            />
            <RecipeUserListSection isHeader={true} users={influencers}/>
          </main>
        </div>
      </DefaultBody>
    </>
  );
}
