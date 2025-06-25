// context/OrderContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

type OrderItem = {
  productId: number;
  imageUrl: string;
  productName: string;
  sellerName: string;
  productOption: string;
  quantity: number;
  productPrice: number;
};

type OrderContextType = {
  items: OrderItem[];
  setItems: (items: OrderItem[]) => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<OrderItem[]>([]);
  return (
    <OrderContext.Provider value={{ items, setItems }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('OrderContext is not used within provider');
  return context;
};
