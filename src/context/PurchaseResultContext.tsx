'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
type simplePurchaseResponseDto ={
  id: number;
  imageUrl: string;
  price: number;
  productName: string;
  productOption: string;
  purchaseDate: Date;
  quantity: number;
  sellerNickname: string;
  status: string;
}

interface PurchaseResult {
  id: number;
  simplePurchaseResponseDtos: simplePurchaseResponseDto[];
  paymentMethod: string;
  productPrice: number;
  deliveryFee: number;
  totalPrice: number;
  consumerNickname: string;
  consumerAddress: string;
  consumerPhoneNumber: string;
}

interface PurchaseResultContextType {
  result: PurchaseResult | null;
  setResult: (data: PurchaseResult) => void;
}

const PurchaseResultContext = createContext<PurchaseResultContextType | undefined>(undefined);

export const PurchaseResultProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<PurchaseResult | null>(null);

  return (
    <PurchaseResultContext.Provider value={{ result, setResult }}>
      {children}
    </PurchaseResultContext.Provider>
  );
};

export const usePurchaseResult = () => {
  const context = useContext(PurchaseResultContext);
  if (!context) throw new Error('usePurchaseResult must be used within PurchaseResultProvider');
  return context;
};
