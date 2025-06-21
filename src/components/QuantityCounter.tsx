'use client';

import React from 'react';

interface QuantityCounterProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityCounter = ({ quantity, onIncrease, onDecrease }: QuantityCounterProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrease}
        className={`w-7 h-7 rounded-full border border-[#D9D9D9] flex items-center justify-center ${
          quantity === 1 ? 'cursor-not-allowed bg-[#F3F3F3] text-[#C2C2C2]' : 'text-[#222]'}`
        }
        disabled={quantity === 1}
      >
        -
      </button>
      <div className="w-8 h-7 border rounded border-[#D9D9D9]  text-center flex items-center justify-center text-[14px] text-[#222]">
        {quantity}
      </div>
      <button
        onClick={onIncrease}
        className="w-7 h-7 border rounded-full text-[#222] flex border-[#D9D9D9] items-center justify-center"
      >
        +
      </button>
    </div>
  );
};

export default QuantityCounter;
