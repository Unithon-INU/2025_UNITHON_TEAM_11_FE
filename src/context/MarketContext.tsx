'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MarketInfo } from '@/types/MarketInfo';


type MarketContextType = {
  marketInfo: MarketInfo;
  setMarketInfo: React.Dispatch<React.SetStateAction<MarketInfo>>;
};

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: ReactNode }) {
  const [marketInfo, setMarketInfo] = useState<MarketInfo>({
    name: '',
    phone: '',
    marketName: '',
    postalAddress: '',
    defaultAddress: '',
    restAddress: '',
    registNum: '',
    RegistFile: null,
    Passbook: null ,
    certifidoc: null,
    bankNum: '',
    bank: '',
    intro: '',
    profile: null ,
  });

  return (
    <MarketContext.Provider value={{ marketInfo, setMarketInfo }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a UserProvider');
  }
  return context;
}
