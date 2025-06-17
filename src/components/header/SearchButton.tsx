"use client";

import React from "react";

interface SearchButtonProps {
    onClick?: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="text-gray-600 hover:text-gray-900 flex items-center"
            aria-label="검색"
        >
            <img
                src="/asset/headerSearch.svg"
                alt="검색"
                className="w-[25px] h-[25px] mr-[10px]"
            />
        </button>
    );
};

export default SearchButton;
