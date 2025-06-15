'use client';

import Link from 'next/link';

const HomeIconPath  = '/asset/home.svg';
const MarketIconPath = '/asset/market.svg';
const RecipeIconPath = '/asset/recipe.svg';
const HeartIconPath = '/asset/heart.svg';
const MypageIconPath = '/asset/mypage.svg';


const ActiveHomeIconPath  = '/asset/homeA.svg';
const ActiveMarketIconPath = '/asset/marketA.svg';
const ActiveRecipeIconPath ='/asset/recipeA.svg';
const ActivHeartIconPath ='/asset/heartA.svg';
const ActiveMypageIconPath = '/asset/mypageA.svg';


interface BottomNavProps {
    activeIndex?: number; // 활성화된 항목의 인덱스, 기본값 설정 가능
}

export default function BottomNav({ activeIndex = 0 }: BottomNavProps) {
    return (
        <nav
            className="fixed bottom-0  bg-white right-0 w-full left-1/2 -translate-x-1/2 max-w-[500px]"
            style={{
                boxShadow: '0px -2px 15px 5px rgba(0, 0, 0, 0.00)', // 얇고 가벼운 그림자
                height: '82px', // 컴팩트한 높이
            }}
        >
            <ul className="flex justify-around items-center h-full">
                
                <li className="flex-1 text-center">
                    <Link href='/main' className="flex flex-col justify-center items-center h-full">
                        <img src={ activeIndex===0 ? ActiveHomeIconPath : HomeIconPath} width={24} height={24} className="stroke-red-500"  alt='메인'/>
                        <p className={`mt-[4px] font-pretendard font-medium text-[12px] leading-[14px] text-center tracking-[-0.03em] flex-none order-1 self-stretch flex-grow-0
    ${activeIndex === 0 ? "text-[#817468]" : "text-[#CCC3BB]"}`}>홈</p>
                    </Link>
                </li>
                <li className="flex-1 text-center">
                    <Link href='/market' className="flex  flex-col justify-center items-center h-full">
                    <img src={ activeIndex===1 ? ActiveMarketIconPath : MarketIconPath} width={30} height={30} alt='장터' />
                    <p className={`mt-[4px] font-pretendard font-medium text-[12px] leading-[14px] text-center tracking-[-0.03em] flex-none order-1 self-stretch flex-grow-0
    ${activeIndex === 1 ? "text-[#817468]" : "text-[#CCC3BB]"}`}>장터</p>
                    </Link>
                </li>
                <li className="flex-1 text-center">
                    <Link href='/recipe' className="flex  flex-col justify-center items-center h-full">
                    <img src={ activeIndex===2 ? ActiveRecipeIconPath : RecipeIconPath } width={30} height={30}  alt='레시피'/>
                    <p className={`mt-[4px] font-pretendard font-medium text-[12px] leading-[14px] text-center tracking-[-0.03em] flex-none order-1 self-stretch flex-grow-0
    ${activeIndex === 2 ? "text-[#817468]" : "text-[#CCC3BB]"}`}>레시피</p>
                    </Link>
                </li>
                <li className="flex-1 text-center">
                    <Link href='/heart' className="flex  flex-col justify-center items-center h-full">
                    <img src={ activeIndex===3 ? ActivHeartIconPath : HeartIconPath} width={30} height={30}  alt='찜'/>
                    <p className={`mt-[4px] font-pretendard font-medium text-[12px] leading-[14px] text-center tracking-[-0.03em] flex-none order-1 self-stretch flex-grow-0
    ${activeIndex === 3 ? "text-[#817468]" : "text-[#CCC3BB]"}`}>찜</p>
                    </Link>
                </li>
                   <li className="flex-1 text-center">
                    <Link href='/mypage' className="flex  flex-col justify-center items-center h-full">
                    <img src={ activeIndex===4 ? ActiveMypageIconPath : MypageIconPath} width={30} height={30}  alt='마이페이지'/>
                    <p className={`mt-[4px] font-pretendard font-medium text-[12px] leading-[14px] text-center tracking-[-0.03em] flex-none order-1 self-stretch flex-grow-0
    ${activeIndex === 4 ? "text-[#817468]" : "text-[#CCC3BB]"}`}>마이페이지</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
