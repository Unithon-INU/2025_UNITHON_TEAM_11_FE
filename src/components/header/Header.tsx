"use client";

import React, { ReactNode } from "react";
import BackButton from "./BackButton";
import Title from "./Title";
import SearchButton from "./SearchButton";

interface HeaderProps {
  children: ReactNode;
}

/**
 * 특정 컴포넌트(BackButton, Title 등)와 일치하는지 확인하는 헬퍼 함수
 */
function isElementType(child: ReactNode, component: any) {
  return React.isValidElement(child) && child.type === component;
}

const Header = ({ children }: HeaderProps) => {
  let backButton: ReactNode = null;
  let title: ReactNode = null;
  let searchButton: ReactNode = null;
  let menu: ReactNode = null;
  let logo: ReactNode = null;
  let notice: ReactNode = null;
  const others: ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (isElementType(child, Header.BackButton)) {
      backButton = child;
    } else if (isElementType(child, Header.Title)) {
      title = child;
    } else if (isElementType(child, Header.SearchButton)) {
      searchButton = child;
    } else {
      others.push(child);
    }
  });

  return (
    <header
      className="
        relative
        flex items-center
        
        h-[56px]
        px-4
        bg-white
        w-full
        max-w-[500px]
        mx-auto
        
      
        z-50
      "
    >
      {/* 왼쪽: BackButton */}
      <div className="flex items-center min-w-[30px] ">
        {backButton}
      </div>

      {/* 중앙: Title (항상 중앙 고정) */}
      <div
        className="
          font-pretendard font-semibold text-lg leading-[100%] tracking-[-0.03em]
        "
      >
        {title}
      </div>

      {/* 오른쪽: SearchButton 등 */}
      <div className="flex items-center justify-end min-w-[40px]">
        {searchButton}
        {menu}
        {notice}
      </div>
    </header>
  );
};

// 확장 속성으로 각 컴포넌트를 연결
Header.BackButton = BackButton;
Header.Title = Title;
Header.SearchButton = SearchButton;

export default Header;
