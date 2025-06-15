'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserInfo = {
  email: string;
  id: string;
  password: string;
  nickname: string;
  profileImage: string;
  intro: string;
};

type UserContextType = {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    id: '',
    password: '',
    nickname: '',
    profileImage: '',
    intro: '',
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
