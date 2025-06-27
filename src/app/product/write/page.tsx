'use client';

import '@/app/globals.css';
import React, { useState, useEffect, ChangeEvent } from 'react';
import Header from '@/components/header/Header';
import DefaultBody from '@/components/defaultBody';
import CommonButton from '@/components/CommonButton';
import { useRouter } from 'next/navigation';
import { PostAddProduct } from '@/api/product/postProduct';

export default function RegisterProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [discount, setDiscount] = useState(false);
  const [options, setOptions] = useState([{ name: '', extra: '' }]);
  const [deliveryPrice, setDeliveryPrice] = useState('');
  const [deliverySchedule, setDeliverySchedule] = useState('');
  const [origin, setOrigin] = useState('');
  const [harvest, setHarvest] = useState('');
  const [expiry, setExpiry] = useState('');
  const [storage, setStorage] = useState('');
  const [etc, setEtc] = useState('');

  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkValid =
      title.trim() &&
      summary.trim() &&
      price.trim() &&
      quantity.trim() &&
      weight.trim() &&
      options.every(opt => opt.name.trim() && opt.extra.trim()) &&
      deliveryPrice.trim() &&
      deliverySchedule.trim() &&
      origin.trim() &&
      harvest.trim() &&
      expiry.trim() &&
      storage.trim() &&
      selectedCourier &&
      mainImage;
    setIsValid(Boolean(checkValid));
  }, [
    title, summary, price, quantity, weight, options,
    deliveryPrice, deliverySchedule, origin, harvest,
    expiry, storage, selectedCourier, mainImage
  ]);

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
      setMainPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async () => {
    if (!isValid || loading || !mainImage) return;

    try {
      setLoading(true);

      const productData = {
        packaging: storage,
        discountRatePercent: discount ? 10 : 0,
        origin,
        price: Number(price),
        deliveryCompany: selectedCourier ?? '',
        harvestPeriod: harvest,
        name: title,
        deliverySchedule: Number(deliverySchedule),
        productOptions: options.map(opt => ({
          optionName: opt.name,
          additionalPrice: Number(opt.extra),
        })),
        totalStock: quantity,
        deliveryFee: Number(deliveryPrice),
        additionalInfo: etc,
        volume: weight,
        description: summary,
        expirationDate: expiry,
      };

      const res = await PostAddProduct(
        productData,
        mainImage,
        [] // 상세 이미지가 현재 없으므로 빈 배열 전달
      );

      alert('상품이 성공적으로 등록되었습니다!');
      router.push('/sale/complete');
    } catch (error) {
      console.error('상품 등록 실패', error);
      alert('상품 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Header>
        <Header.BackButton />
        <Header.Title>판매글 등록</Header.Title>
      </Header>

      <DefaultBody hasHeader={1}>
        <div className="p-4 space-y-6 text-[15px] text-[#222] font-medium">

          {/* 대표 이미지 */}
          <div>
            <p className="mb-3 font-semibold">대표 이미지 등록</p>
            <label htmlFor="mainImageInput">
              <div className="w-[88px] h-[88px] bg-[#F2EEE9] rounded-xl flex items-center justify-center overflow-hidden cursor-pointer">
                {mainPreview ? (
                  <img src={mainPreview} alt="대표 이미지" className="object-cover w-full h-full" />
                ) : (
                  <img src="/asset/camera.svg" alt="카메라 아이콘" className="w-6 h-6" />
                )}
              </div>
              <input
                type="file"
                id="mainImageInput"
                accept="image/*"
                className="hidden"
                onChange={handleMainImageChange}
              />
            </label>
          </div>

          {/* 상품 이름 + AI 도움 받기 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p>상품 이름</p>
              <button className="text-[12px] px-2 py-1 rounded border text-[#999]">AI 도움 받기</button>
            </div>
            <input
              className="w-full p-3 bg-[#F2EEE9] rounded-lg text-[#333]"
              placeholder="상품 이름을 적어주세요!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 요약 설명 */}
          <div className='mb-7'>
            <p className="mb-2">요약 설명</p>
            <textarea
              className="w-full p-3 bg-[#F2EEE9] rounded-lg text-[#333]"
              placeholder="상품에 대한 간단한 요약을 해주세요."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          {/* 가격, 수량, 무게 */}
          <div > 
            <p className="mb-2">상품 가격</p>
            <input
              className="w-full p-3 bg-[#F2EEE9] rounded-lg text-[#333] mb-7"
              placeholder="상품 가격을 적어주세요!"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <p className="mb-2">총 수량</p>
            <input
              className="w-full p-3 bg-[#F2EEE9] rounded-lg text-[#333] mb-7"
              placeholder="상품의 단위 당 몇 개인지 적어주세요!"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <p className="mb-2">상품 무게</p>
            <input
              className="w-full p-3 bg-[#F2EEE9] rounded-lg text-[#333]"
              placeholder="상품의 단위 당 무게를 적어주세요!"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {/* 할인 퍼센트 */}
          <div className="flex items-center mt-10">
            <input
              type="checkbox"
              checked={discount}
              onChange={() => setDiscount(!discount)}
              className="mr-2"
            />
            <span>상품 할인 적용(퍼센트)</span>
          </div>

          {/* 판매 옵션 */}
          <div>
            <p className="mt-10 mb-2">판매 옵션(혹은 무게)</p>
            {options.map((opt, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  className="flex-1 p-3 bg-[#F2EEE9] rounded-lg text-[#333]"
                  placeholder="옵션"
                  value={opt.name}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[idx].name = e.target.value;
                    setOptions(newOptions);
                  }}
                />
                <input
                  className="w-[80px] p-3 bg-[#F2EEE9] rounded-lg text-[#333]"
                  placeholder="추가금"
                  value={opt.extra}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[idx].extra = e.target.value;
                    setOptions(newOptions);
                  }}
                />
                <button onClick={() => setOptions(prev => prev.filter((_, i) => i !== idx))}>
                  <img src="/asset/trash.svg" alt="삭제" />
                </button>
              </div>
            ))}
            <button
              className="w-full border border-[#D9D9D9] py-2 rounded-lg text-[#999]"
              onClick={() => setOptions(prev => [...prev, { name: '', extra: '' }])}
            >
              + 옵션 추가
            </button>
          </div>

          {/* 택배사 선택 */}
          <div>
            <p className="mt-10 mb-2">택배사 선택</p>
            <div className="grid grid-cols-2 gap-2">
              {['CJ 대한통운', '롯데 택배', '한진 택배', '우체국', '기타'].map((courier) => (
                <label key={courier} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="courier"
                    value={courier}
                    checked={selectedCourier === courier}
                    onChange={() => setSelectedCourier(courier)}
                  />
                  <span>{courier}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 배송비 */}
          <div>
            <p className="mt-10 mb-2">배송비</p>
            <input
              className="w-full p-3 bg-[#F2EEE9] rounded-lg text-[#333]"
              placeholder="배송비를 적어주세요!"
              value={deliveryPrice}
              onChange={(e) => setDeliveryPrice(e.target.value)}
            />
          </div>

          {/* 배송일정 */}
          <div>
            <p className="mt-10 mb-2">배송일정</p>
            <input
              className="w-full p-3 bg-[#F2EEE9] rounded-lg text-[#333]"
              placeholder="예: 주문일 기준 1일내 발송"
              value={deliverySchedule}
              onChange={(e) => setDeliverySchedule(e.target.value)}
            />
          </div>

          {/* 원산지 */}
          <div>
            <p className="mt-10 mb-2">원산지</p>
            <input
              className="w-full p-3 bg-[#F2EEE9] rounded-lg text-[#333]"
              placeholder="원산지를 적어주세요!"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>

          {/* 수확 시기 */}
          <div>
            <p className="mt-10 mb-2">수확 시기</p>
            <input
              className="w-full p-3 bg-[#F2EEE9] rounded-lg text-[#333]"
              placeholder="수확 시기를 적어주세요!"
              value={harvest}
              onChange={(e) => setHarvest(e.target.value)}
            />
          </div>

          {/* 소비기한 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p>소비기한</p>
            </div>
            <input
              className="w-full p-3 bg-[#F2EEE9] rounded-lg text-[#333]"
              placeholder="예: 4개월"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>

          {/* 보관 방법 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p>보관 방법</p>
            </div>
            <input
              className="w-full p-3 bg-[#F2EEE9] rounded-lg text-[#333]"
              placeholder="보관 방법을 적어주세요."
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
            />
          </div>

          {/* 기타 설명 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p>기타 설명(선택)</p>
            </div>
            <textarea
              className="w-full p-3 bg-[#F2EEE9] rounded-lg text-[#333]"
              placeholder="다른 내용이 있다면 자유롭게 적어주세요."
              value={etc}
              onChange={(e) => setEtc(e.target.value)}
            />
          </div>
        </div>
     </DefaultBody>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 px-4 py-3 max-w-[500px] mx-auto">
        <CommonButton
          disabled={!isValid || loading}
          animate={isValid && !loading}
          onClick={handleRegister}
        >
          {loading ? '등록 중...' : '상품 등록'}
        </CommonButton>
      </div>
    </div>
  );
}