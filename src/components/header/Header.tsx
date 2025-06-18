"use client";

import React, { ReactNode } from "react";
import BackButton from "./BackButton";
import Title from "./Title";
import SearchButton from "./SearchButton";
import CartButton from "./CartButton";
import HeartButton from "./HeartButton";
import ShareButton from "./ShareButton";
import HomeButton from "./HomeButton";
interface HeaderProps {
  children: ReactNode;
}

function isElementType(child: ReactNode, component: any) {
  return React.isValidElement(child) && child.type === component;
}

const Header = ({ children }: HeaderProps) => {
  let backButton: ReactNode = null;
  let title: ReactNode = null;
  const rightButtons: ReactNode[] = [];
  const others: ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (isElementType(child, Header.BackButton)) {
      backButton = child;
    } else if (isElementType(child, Header.Title)) {
      title = child;
    } else if (isElementType(child, Header.RightButton)) {
      rightButtons.push(child);
    } else {
      others.push(child);
    }
  });

  return (
    <header
      className="fixed top-0 left-0 right-0 flex items-center h-[56px] px-4 bg-white w-full max-w-[500px] mx-auto z-50"
    >
      {/* 왼쪽: BackButton */}
      <div className="flex items-center min-w-[30px]">{backButton}</div>

      {/* 중앙: Title */}
      <div className="flex-1 text-center font-pretendard font-semibold text-lg leading-[100%] tracking-[-0.03em]">
        {title}
      </div>

      {/* 오른쪽: 여러 개 버튼 가능 */}
      <div className="flex items-center gap-2 min-w-[40px] justify-end">
        {rightButtons}
      </div>
    </header>
  );
};

// 확장 가능한 slot 방식 연결
Header.BackButton = BackButton;
Header.Title = Title;
Header.SearchButton = SearchButton;
Header.CartButton = CartButton;
Header.HeartButton = HeartButton;
Header.HomeButton = HomeButton;
Header.ShareButton = ShareButton;

// 새로 추가된 slot 컴포넌트 (우측 버튼 전용)
Header.RightButton = ({ children }: { children: ReactNode }) => <>{children}</>;

export default Header;
