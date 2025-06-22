import './globals.css';
import { ReactNode } from 'react';
import type { Viewport } from 'next'
import Script from 'next/script';
import { UserProvider } from '@/context/UserContext';
import { MarketProvider } from '@/context/MarketContext';
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html id="scrollbar-hidden" lang="ko" className="w-full h-full ">
            <head>
                <title>프링</title>
            </head>
            
           
                        <body
                            id="scrollbar-hidden"
                            className="bg-white max-w-full min-h-full flex justify-center"
                        >
                            {" "}
                            {/* 바텀 네비게이션 높이만큼 패딩 추가 */}
                            <UserProvider>
                                <MarketProvider>
                                    <div className="flex flex-col  bg-[#FFFDFB] w-full min-h-full max-w-[500px] ">
                                        {children}
                                    </div>
                                </MarketProvider>
                            </UserProvider>
                        </body>
                   
        </html>
    );
}
