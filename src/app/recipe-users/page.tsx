'use client';

import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import SearchBar from '@/components/home/SearchBar';
import { useState } from 'react';
import RecipeUserListSection from '@/components/recipe/users/RecipeUserListSection';
import InfluencerRankingSection from '@/components/recipe/users/InfluencerRankingSection';


export default function RecipeUsersPage() {

   

  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.Title>레시피 유저 둘러보기</Header.Title>
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col ">
          <main className="flex flex-col items-start">
            <SearchBar showCartButton={false} ></SearchBar>
            <InfluencerRankingSection/>
            <RecipeUserListSection isHeader={true}/>
          </main>
        </div>
      </DefaultBody>
    </>
  );
}
