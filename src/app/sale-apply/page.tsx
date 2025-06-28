'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/header/Header';
import CommonButton from '@/components/CommonButton';
import DefaultBody from '@/components/defaultBody';
import DefaultInput from '@/components/DefaultInput';
import { useMarket } from '@/context/MarketContext';
import { useRouter } from 'next/navigation';

export default function SaleApplyPage() {
 
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [marketName, setMarketName] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [defaultAddress, setDefaultAddress] = useState('');
  const [restAddress, setRestAddress] = useState('');
  const isFilled = name && phone && marketName && postalAddress && defaultAddress && restAddress;
  const { setMarketInfo } = useMarket();

 
 

  const handleSave = () => {
    setMarketInfo( prev=> ({ 
      ...prev,
      name:name,
      phone: phone,
      marketName:marketName,
      postalAddress:postalAddress,
      defaultAddress:defaultAddress,
      restAddress:restAddress,
    })   
    );
    console.log('업데이트됨');
    router.push('/sale-apply/info')
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
              프링에서 농수산물을 팔고 싶으시다면 <br />
              <span>
                <span className='font-pretendard font-semibold text-[20px] leading-[135%] tracking-[-0.03em]'>입점에 필요한 기본정보</span>
                를 입력해주세요!
              </span>
            </h1>
            
        <div className="flex w-full max-w-[350px]  flex-col  jusgap-2">
            <p className='mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]'>대표자 이름</p>
          <DefaultInput
                type="text"
                placeholder="대표자 이름 입력"
                value={name}
                onChange={e => setName(e.target.value)}
                showCheckButton={false}
                />

            <p className="mt-8 mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]">연락처</p>
            <DefaultInput
                type="text"
                placeholder="연락처 입력"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                showCheckButton={false}
                />

            <p className="mt-8 mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]">농장 이름 혹은 스토어명</p>
            <DefaultInput
                type="text"
                placeholder="농장 이름이나 스토어명 입력"
                value={marketName}
                onChange={e => setMarketName(e.target.value)}
                />

             <p className="mt-[32px] mb-[8px] font-pretendard font-medium text-[15px] leading-[145%] tracking-[-0.03em]">주소지(배송지 혹은 생산지)</p>
             
             <div className='flex flex-col gap-y-2'>

                <div className='flex flex-row w-full gap-2'>
                    <div className='w-[75%]'>
                        <DefaultInput
                            type="text"
                            placeholder="우편주소 검색"
                            value={postalAddress}
                            onChange={e => setPostalAddress(e.target.value)}
                            />
                    </div>
                </div>
                <DefaultInput
                    type="text"
                    placeholder="기본 주소"
                    value={defaultAddress}
                    onChange={e => setDefaultAddress(e.target.value)}
                    />

                <DefaultInput
                    type="text"
                    placeholder="상세 주소"
                    value={restAddress}
                    onChange={e => setRestAddress(e.target.value)}
                    />
            </div>
            


                
            

         
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
    </>
  );
}
