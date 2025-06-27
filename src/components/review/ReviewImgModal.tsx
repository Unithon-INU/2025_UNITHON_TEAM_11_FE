'use client';

import React, { useState, useEffect } from 'react';


type Props = {
  isOpen: boolean;
  onClose: () => void;
  images: string[];

};

export default function ReviewImgModal({
  isOpen,
  onClose,
  images,
}: Props) {


  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

 
  

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white z-50 flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-[18px] font-semibold">사진&동영상 리뷰</h2>
        <button className="text-[20px]" onClick={onClose}>✕</button>
      </div>

      {/* 내용 */}
      <div className="flex-1 overflow-y-auto pt-4 pb-[100px] px-4">
        <div className="grid grid-cols-3 gap-2">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`review-${idx}`}
              className="w-full aspect-square object-cover rounded-md"
            />
          ))}
        </div>
      </div>

      
    </div>
  );
}
