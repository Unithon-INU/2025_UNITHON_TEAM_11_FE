'use client';

import '@/app/globals.css';
import React, { useState, useEffect, ChangeEvent } from 'react';
import DefaultBody from '@/components/defaultBody';
import CommonButton from '@/components/CommonButton';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/Header';
import QuantityCounter from '@/components/QuantityCounter';
import { PostRecipe } from '@/api/recipe/postRecipe';

export default function RegisterRecipePage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [servings, setServings] = useState(1);
  const [cookTime, setCookTime] = useState('10분 이내');
  const [difficulty, setDifficulty] = useState('쉬움');
  const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
  const [sauces, setSauces] = useState([{ name: '', amount: '' }]);
  const [steps, setSteps] = useState<{ description: string; image: File | null; previewUrl: string | null }[]>([{ description: '', image: null, previewUrl: null }]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const hasTitle = title.trim() !== '';
    const hasIntro = intro.trim() !== '';
    const hasIngredient = ingredients.some(i => i.name && i.amount);
    const hasStep = steps.some(s => s.description);
    const hasMainImage = !!mainImage;
    setIsValid(hasTitle && hasIntro && hasIngredient && hasStep && hasMainImage);
  }, [title, intro, ingredients, steps, mainImage]);

  // 대표 이미지 핸들러
  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
      setMainPreview(URL.createObjectURL(file));
    }
  };

  // 단계 이미지 핸들러
  const handleStepImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedSteps = [...steps];
      updatedSteps[index].image = file;
      updatedSteps[index].previewUrl = URL.createObjectURL(file);
      setSteps(updatedSteps);
    }
  };

  const handleRegister = async () => {
    if (!isValid || loading) return;
    try {
      setLoading(true);
      const ingredientsObj: Record<string, string> = {};
      ingredients.forEach(i => {
        if (i.name && i.amount) ingredientsObj[i.name] = i.amount;
      });

      const saucesObj: Record<string, string> = {};
      sauces.forEach(s => {
        if (s.name && s.amount) saucesObj[s.name] = s.amount;
      });

      const stepsData = steps.map((step, idx) => ({
        stepOrder: idx + 1,
        description: step.description,
      }));

      const descriptionImages = steps
        .filter(step => step.image)
        .map(step => step.image as File);

      const response = await PostRecipe(
        title,
        intro,
        servings,
        cookTime,
        difficulty,
        ingredientsObj,
        saucesObj,
        stepsData,
        mainImage as File,
        descriptionImages
      );

      alert('레시피가 등록되었습니다!');
      router.push('/recipe');
    } catch (error) {
      console.error(error);
      alert('레시피 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-auto mb-auto'>
      <Header>
        <Header.BackButton />
        <Header.Title>레시피 등록하기</Header.Title>
      </Header>

      <DefaultBody hasHeader={1}>
        <div className="p-4 px-5 space-y-6 text-sm text-[#222] text-[16px] font-semibold">

          {/* 대표 이미지 */}
          <div>
            <p className="mb-3 font-semibold">대표 이미지 등록</p>
            <label htmlFor="mainImageInput">
              <div className="w-[88px] h-[88px] bg-[#F2EEE9] rounded-xl flex items-center justify-center text-[#B0B0B0] text-xl overflow-hidden cursor-pointer">
                {mainPreview ? (
                  <img src={mainPreview} alt="대표 이미지" className="object-cover w-full h-full" />
                ) : (
                  <img src={'/asset/camera.svg'} alt="카메라 아이콘" />
                )}
              </div>
              <input
                type="file"
                id="mainImageInput"
                accept="image/*"
                className="hidden "
                onChange={handleMainImageChange}
              />
            </label>
          </div>

          {/* 레시피 이름 */}
          <div>
            <p className="mb-3 mt-10">레시피 이름</p>
            <input
              className="w-full p-3 focus:outline-none bg-[#F2EEE9] rounded-lg text-[#9F9F9F] font-medium text-[15px]"
              placeholder="레시피 이름을 적어주세요!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 소개글 */}
          <div>
            <p className="mb-3 mt-9">레시피 소개글</p>
            <textarea
              rows={3}
              className="w-full p-3 focus:outline-none bg-[#F2EEE9] rounded-lg text-[#9F9F9F] font-medium text-[15px]"
              placeholder="레시피에 대한 소개와 설명을 적어주세요!"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
            />
          </div>

          {/* 인원 수 */}
          <div className="flex items-center gap-2 justify-between mt-10">
            <p className="w-[60px] shrink-0">인원 수</p>
            <div className='flex flex-row items-center gap-2'>
              <QuantityCounter
                quantity={servings}
                onIncrease={() => setServings(prev => prev + 1)}
                onDecrease={() => setServings(prev => Math.max(1, prev - 1))}
              />
              <span>인분</span>
            </div>
          </div>

          {/* 조리 시간 */}
          <div className="flex items-center justify-between gap-2 mt-10">
            <span>조리 시간</span>
            <select
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              className="ml-2 rounded p-1 focus:outline-none"
            >
              <option>10분 이내</option>
              <option>30분 이내</option>
              <option>1시간 이내</option>
            </select>
          </div>

          {/* 난이도 */}
          <div className="flex items-center justify-between gap-2 mt-10">
            <span>난이도</span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="ml-2 rounded p-1 focus:outline-none"
            >
              <option>쉬움</option>
              <option>보통</option>
              <option>어려움</option>
            </select>
          </div>

            {/* 재료 */}
          <div>
            <p className="font-semibold mb-2 mt-10">재료</p>
            {ingredients.map((item, index) => (
              <div key={index} className="flex w-full gap-1 mb-3">
                <input
                  className="w-[46%] bg-[#F2EEE9] rounded-[8px] px-4 py-[10px] text-[15px] text-[#9F9F9F]"
                  placeholder="재료 이름"
                  value={item.name}
                  onChange={(e) => {
                    const newItems = [...ingredients];
                    newItems[index].name = e.target.value;
                    setIngredients(newItems);
                  }}
                />
                <input
                  className="w-[46%] bg-[#F2EEE9] rounded-[8px] p-2 mr-[5px] px-4 py-[10px] text-[15px] text-[#9F9F9F]"
                  placeholder="재료 양"
                  value={item.amount}
                  onChange={(e) => {
                    const newItems = [...ingredients];
                    newItems[index].amount = e.target.value;
                    setIngredients(newItems);
                  }}
                />
                <button onClick={() => setIngredients(prev => prev.filter((_, i) => i !== index))}><img src={'/asset/trash.svg'}></img></button>
              </div>
            ))}
            <button className='w-full border border-[#D9D9D9] py-3 rounded-[8px] text-[14px] text-[#9F9F9F]' onClick={() => setIngredients(prev => [...prev, { name: '', amount: '' }])}>
                + 재료 추가
            </button>
          </div>

          {/* 소스 재료 */}
          <div>
            <p className="font-semibold mt-10 mb-2">소스 재료</p>
            {sauces.map((item, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  className="w-[46%] bg-[#F2EEE9] rounded-[8px] px-4 py-[10px] text-[15px] text-[#9F9F9F]"
                  placeholder="소스 이름"
                  value={item.name}
                  onChange={(e) => {
                    const newItems = [...sauces];
                    newItems[index].name = e.target.value;
                    setSauces(newItems);
                  }}
                />
                <input
                  className="w-[46%] bg-[#F2EEE9] rounded-[8px] px-4 py-[10px] text-[15px] text-[#9F9F9F]"
                  placeholder="소스 양"
                  value={item.amount}
                  onChange={(e) => {
                    const newItems = [...sauces];
                    newItems[index].amount = e.target.value;
                    setSauces(newItems);
                  }}
                />
                <button onClick={() => setSauces(prev => prev.filter((_, i) => i !== index))}><img src={'/asset/trash.svg'}></img></button>
              </div>
            ))}
            <button className='w-full border border-[#D9D9D9] py-3 rounded-[8px] text-[14px] text-[#9F9F9F]' onClick={() => setSauces(prev => [...prev, { name: '', amount: '' }])}>
              + 소스 추가
            </button>
          </div>



          {/* 레시피 단계 */}
          <div>
            <p className="font-semibold mt-10 mb-3">레시피 순서</p>
            {steps.map((step, index) => (
              <div key={index} className="flex items-start mb-3 gap-1">
                {/* 번호, 삭제 */}
                <div className="text-sm text-[#5E5E5E] w-6 h-6 ">
                  <p className="text-[18px] leading-[20px]">{index + 1}.</p>
                  <button
                    type="button"
                    onClick={() => setSteps(prev => prev.filter((_, i) => i !== index))}
                    className="text-[#9F9F9F] mt-1 w-3 h-3"
                  >
                    <img src={'/asset/trash.svg'} alt="삭제" />
                  </button>
                </div>

                {/* 이미지 업로드 */}
                <label htmlFor={`stepImageInput-${index}`}>
                  <div className="w-20 h-20 shrink-0 rounded-lg bg-[#F2EEE9] flex items-center justify-center overflow-hidden cursor-pointer">
                    {step.previewUrl ? (
                      <img src={step.previewUrl} alt={`단계 이미지 ${index + 1}`} className="object-cover w-full h-full" />
                    ) : (
                      <img src="/asset/camera.svg" alt="사진" className="w-5 h-5" />
                    )}
                  </div>
                  <input
                    type="file"
                    id={`stepImageInput-${index}`}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleStepImageChange(e, index)}
                  />
                </label>

                {/* 설명 */}
                <textarea
                  rows={2}
                  className="focus:outline-none flex-1 h-20 bg-[#F2EEE9] rounded-lg p-3 text-sm font-normal text-[#9F9F9F] resize-none"
                  placeholder="레시피를 적어주세요."
                  value={step.description}
                  onChange={(e) => {
                    const updatedSteps = [...steps];
                    updatedSteps[index].description = e.target.value;
                    setSteps(updatedSteps);
                  }}
                />
              </div>
            ))}

            <button
              className="w-full border border-[#D9D9D9] py-3 rounded-[8px] text-[14px] text-[#9F9F9F]"
              onClick={() => setSteps(prev => [...prev, { description: '', image: null, previewUrl: null }])}
            >
              + 단계 추가
            </button>
          </div>
        </div>
      </DefaultBody>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 px-4 py-3 max-w-[500px] mx-auto flex items-center gap-2">
        <CommonButton disabled={!isValid || loading} animate={isValid} onClick={handleRegister}>
          {loading ? '등록 중...' : '레시피 등록하기'}
        </CommonButton>
      </div>
    </div>
  );
}
