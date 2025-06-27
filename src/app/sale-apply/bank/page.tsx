'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/header/Header';
import CommonButton from '@/components/CommonButton';
import DefaultBody from '@/components/defaultBody';
import DefaultInput from '@/components/DefaultInput';
import { useMarket } from '@/context/MarketContext';
import { useRouter } from 'next/navigation';
import BankOptionDrawer from '@/components/apply/BankOptionDrawer';

export default function SaleApplyBankPage() {
 
  const router = useRouter();
  const [bankNum, setBankNum] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [isbankNumOk, setBankNumOk] = useState(false);
  const isFilled = bankNum && selectedBank;
  const { setMarketInfo } = useMarket();

 
 

  const handleSave = () => {
    setMarketInfo( prev=> ({ 
      ...prev,
      bankNum:bankNum,
      bank: selectedBank,
    })   
    );
    console.log('업데이트됨');
    router.push('/sale-apply/intro')
  };



  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.Title>입점 신청</Header.Title>
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="flex flex-col  ">
          {/* 본문 영역 */}
          <main className="flex flex-col items-center mt-[24px]">
            <h1 className="flex flex-col font-pretendard font-normal text-[20px] leading-[135%] tracking-[-0.03em] mb-[32px] w-full max-w-[350px] ">
              <span>정산을 위한
                <span className='font-pretendard font-semibold text-[20px] leading-[135%] tracking-[-0.03em]'> 계좌번호</span>를
                <br/>
                 입력해주세요.
              </span>
            </h1>
            
        <div className="flex w-full max-w-[350px]  flex-col  jusgap-2">
            <p className='mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]'>계좌번호 입력</p>
          <DefaultInput
                type="text"
                placeholder="계좌번호 입력"
                value={bankNum}
                onChange={e => setBankNum(e.target.value)}
                showCheckButton={false}
                />
            <div className='mt-2'></div>
            <button className={`flex flex-row justify-between items-center w-full h-12 px-4  rounded-[8px] border border-[#DFD7CF] bg-white text-start font-pretendard font-medium text-[14px] leading-[100%] tracking-[-0.03em] focus:outline-none ${selectedBank? 'text-[#222]' :' text-[#bdbdbd]'}`}>
                {selectedBank || '은행 선택'}
                <img src={'/asset/ChevronDown.svg'} className='w-6 h-6'
                    onClick={ () => {setDrawerOpen(true)}}></img>
            </button>
             
         
            {/* 하단 버튼 영역 */}
             <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[372px] bg-[#FFFDFB]  p-4 [box-shadow:0px_-1px_4px_0px_#00000008] rounded-[12px]">
                <CommonButton
                    type="button"
                    disabled={!isFilled}    
                    onClick={handleSave}>
                        다음
                </CommonButton>
            </div>
        </div> 
        </main>
        </div>
      </DefaultBody>

      <BankOptionDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} onSelectBank={(bankName) => setSelectedBank(bankName)}/>
    </>
  );
}
