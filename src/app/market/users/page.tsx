'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import SearchBar from '@/components/home/SearchBar';
import RecipeUserListSection from '@/components/recipe/users/RecipeUserListSection';
import InfluencerRankingSection from '@/components/recipe/users/InfluencerRankingSection';
import { Influencer } from '@/types/Influencer';
import { GetSeller } from '@/api/member/getSeller';

export default function MarketUsersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const response = await GetSeller();
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
        <Header.Title>농수산물 판매자</Header.Title>
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col">
          <main className="flex flex-col items-start">
            <SearchBar showCartButton={false} />
            <InfluencerRankingSection
                title='판매자 랭킹'
              influencers={influencers.slice(0, 5)}
              onToggleLike={handleToggleLike}
            />
            <RecipeUserListSection isHeader={true} users={influencers} title='판매자 유저'/>
          </main>
        </div>
      </DefaultBody>
    </>
  );
}
