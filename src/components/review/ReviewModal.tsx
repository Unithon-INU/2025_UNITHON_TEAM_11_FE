'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PostRecipeReview } from '@/api/review/postRecipeReview';
import CommonButton from '../CommonButton';
import { PostProductReview } from '@/api/review/postProductReview';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  writer: string;
  recipeName: string;
  recipeId: number;
  ImgUrl: string;
  type: 'recipe' | 'product';
  purchase_option?: string;

};

export default function ReviewModal({
  isOpen,
  onClose,
  writer,
  recipeName,
  recipeId,
  ImgUrl,
  type,
  purchase_option // ✅ props destructure
}: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFilled = comment && rating;

  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      alert('별점과 후기를 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      if (type === 'recipe') {
        await PostRecipeReview(recipeId, rating, comment, imageFile);
        
      } else if (type === 'product') {
        await PostProductReview(recipeId,  rating, comment, imageFile, purchase_option);

      }

      alert('후기가 등록되었습니다!');
      onClose();
    } catch (err) {
      console.error(err);
      alert('후기 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white z-50 flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-[18px] font-semibold">리뷰 남기기</h2>
        <button className="text-[20px]" onClick={onClose}>✕</button>
      </div>

      {/* 내용 */}
      <div className="flex-1 overflow-y-auto pt-4 pb-[100px]">
        {/* 상단 - 이미지 + 텍스트 */}
        <div className="flex gap-3 items-center mb-6 px-4">
          <div className="w-[64px] h-[64px] rounded-md bg-gray-100 overflow-hidden">
            <Image src={ImgUrl} alt="recipe" width={64} height={64} />
          </div>
          <div>
            <div className="text-[13px] text-[#999]">{writer}</div>
            <div className="text-[15px] text-[#222] font-medium">{recipeName}</div>
          </div>
        </div>

        {/* 별점 */}
        <div className="mb-8 border-t-8 border-[#F6F3EE] pt-6 px-4">
          <div className="text-[18px] font-semibold mb-4">레시피 별점</div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setRating(n)}>
                <Image
                  src={rating >= n ? '/asset/star1.svg' : '/asset/Star2.svg'}
                  alt={`${n} star`}
                  width={28}
                  height={28}
                />
              </button>
            ))}
          </div>
        </div>

        {/* 후기 입력 */}
        <div className="mb-4 px-4">
          <div className="text-[18px] font-semibold mb-2">후기</div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="후기를 작성해주세요!"
            className="w-full h-[96px] bg-[#F4F1EC] rounded-lg p-3 text-[15px] resize-none border-none focus:outline-none"
          />
        </div>

        {/* 이미지 업로드 */}
        <div className="mb-8 px-4">
          <label className="w-[80px] h-[80px] bg-[#F4F1EC] rounded-lg flex items-center justify-center cursor-pointer overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt="preview" className="object-cover w-full h-full" />
            ) : (
              <Image src="/asset/camera.svg" alt="camera" width={24} height={24} />
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-2 bg-white border-t border-[#EEE] z-50">
        <CommonButton
          disabled={!isFilled}
          onClick={handleSubmit}
          animate={!isFilled}
        >
          {isSubmitting ? '등록 중...' : '후기 등록'}
        </CommonButton>
      </div>
    </div>
  );
}
