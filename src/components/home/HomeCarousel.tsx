// components/home/HomeCarousel.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/asset/carousel1.svg',
  '/asset/broccoli.svg'
  
];

const HomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full aspect-[1/1] mt-15 overflow-hidden ">
      <Image
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        fill
        className="object-cover transition-all duration-300"
        priority
      />
      <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 rounded-md px-2 py-1">
        {String(currentIndex + 1).padStart(2, '0')} / {images.length}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-none rounded-full p-1 shadow"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-none rounded-full p-1 shadow"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default HomeCarousel;
