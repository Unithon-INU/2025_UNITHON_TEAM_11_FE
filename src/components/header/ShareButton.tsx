"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ShareButtonProps {
    onClick?: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ onClick }) => {

    const router = useRouter();

    const handleBack = () => {
        if (onClick) {
            // onClick이 있으면 onClick 메서드 호출
            onClick();
        } else {
            router.push('/share');
        }
        console.log("BackButton: handleBack");
    };

    return (
        <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-900 flex items-center"
            aria-label="공유"
        >
            <img
                src="/asset/headerShare.svg"
                alt="공유"
                className="w-[25px] h-[25px] mr-[10px]"
            />
        </button>
    );
};

export default ShareButton;
