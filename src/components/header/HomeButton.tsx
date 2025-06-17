"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface SearchButtonProps {
    onClick?: () => void;
}

const HomeButton: React.FC<SearchButtonProps> = ({ onClick }) => {

    const router = useRouter();

    const handleBack = () => {
        if (onClick) {
            // onClick이 있으면 onClick 메서드 호출
            onClick();
        } else {
            router.push('/main');
        }
        console.log("BackButton: handleBack");
    };

    return (
        <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-900 flex items-center"
            aria-label="메인"
        >
            <img
                src="/asset/headerHome.svg"
                alt="메인"
                className="w-[25px] h-[25px] mr-[10px]"
            />
        </button>
    );
};

export default HomeButton;
