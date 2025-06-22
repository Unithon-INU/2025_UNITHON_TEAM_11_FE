'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type MarketInfo = {
  name: string;
  phone: string;
  marketName: string;
  postalAddress: string;
  defaultAddress: string;
  restAddress: string;
  RegistNum: string;
  RegistFile: File | null;
  Passbook: File | null;
  certifidoc: File | null;
  bankNum: string;
  bank: string;
  intro: string;
  profile: File | null;

};

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
    RegistNum: '',
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
