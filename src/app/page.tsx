"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProvider } from "@/context/UserContext";
import { MarketProvider } from "@/context/MarketContext";
import { OrderProvider } from "@/context/OrderContext";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push("/main");
    }, [router]);

    return (
        <UserProvider>
            <MarketProvider>
                <OrderProvider>
                <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-900 text-gray-100">
                </div>
                </OrderProvider>
            </MarketProvider>
        </UserProvider>
    );
}
