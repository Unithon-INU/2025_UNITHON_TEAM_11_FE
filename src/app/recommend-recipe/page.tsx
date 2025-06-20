'use client';
import RecipeTitle from '../../components/detail/RecipeTitle';
import RecipeSortSelector from '../../components/detail/RecipeSortSelector';
import RecipeGridList from '../../components/detail/RecipeGridList';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import { useUser } from '@/context/UserContext';
import { useState } from 'react';

const dummyRecipes = [
  {
    id: 1,
    title: '아이와 함께 만드는 맛있는 건강 피자',
    image: '/asset/pizza.jpg',
    time: '1시간 30분',
    rating: 4.7,
    comment: 5,
    isLiked: true,
  },
  {
    id: 2,
    title: '아보카도 샌드위치',
    image: '/asset/avocado.jpg',
    time: '1시간 30분',
    rating: 4.7,
    comment: 5,
    isLiked: false,
  },
  {
    id: 3,
    title: '다이어트 건강 샐러드',
    image: '/asset/salad.jpg',
    time: '1시간 30분',
    rating: 4.7,
    comment: 5,
    isLiked: false,
  },
  {
    id: 4,
    title: '수제 햄버거',
    image: '/asset/burger.jpg',
    time: '1시간 30분',
    rating: 4.7,
    comment: 5,
    isLiked: false,
  },
  {
    id: 5,
    title: '아이와 함께 만드는 맛있는 건강 파스타',
    image: '/asset/pasta.jpg',
    time: '1시간 30분',
    rating: 4.7,
    comment: 5,
    isLiked: false,
  },
  {
    id: 6,
    title: '아이와 함께 만드는 맛있는 건강 미트볼',
    image: '/asset/meatball.jpg',
    time: '1시간 30분',
    rating: 4.7,
    comment: 5,
    isLiked: false,
  },
];

export default function RecommendRecipetPage() {
  const { userInfo } = useUser();
  const [recipes, setRecipes] = useState(dummyRecipes);

  return (
    <>
      <Header>
        <Header.BackButton />
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col">
          <main className="flex flex-col items-start mt-[24px] px-4">
            <RecipeTitle nickname={userInfo.nickname || '고객'} />
            <RecipeSortSelector />
            <RecipeGridList recipes={recipes} />
          </main>
        </div>
      </DefaultBody>
    </>
  );
}
