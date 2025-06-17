"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface CartProps {
    onClick?: () => void;
}

const HeartButton: React.FC<CartProps> = ({ onClick }) => {
    const router = useRouter();

    const handleBack = () => {
        if (onClick) {
            // onClick이 있으면 onClick 메서드 호출
            onClick();
        } else {
            router.push('/heart');
        }
        console.log("BackButton: handleBack");
    };

    return (
        <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-900 flex items-center"
            aria-label="찜"
        >
            <img
                src="/asset/headerHeart.svg"
                alt="찜"
                className="w-[24px] h-[24px] mr-[10px]"
            />
        </button>
    );
};

export default HeartButton;
