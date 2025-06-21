"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { checkAuthAndRedirect } from '@/utils/checkAuthAndRedirect'
interface CartProps {
    onClick?: () => void;
}

const CartButton: React.FC<CartProps> = ({ onClick }) => {
    const router = useRouter();
    const requireAuth = checkAuthAndRedirect()

    const handleBack = () => {
        if (onClick) {
            // onClick이 있으면 onClick 메서드 호출
            onClick();
        } else {
            if (!requireAuth()) return

            router.push('/cart');
        }
        console.log("BackButton: handleBack");
    };

    return (
        <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-900 flex items-center"
            aria-label="장바구니"
        >
            <img
                src="/asset/cart.svg"
                alt="장바구니"
                className="w-[24px] h-[24px] mr-[12px]"
            />
        </button>
    );
};

export default CartButton;
