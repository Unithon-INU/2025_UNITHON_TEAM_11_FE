// api/product/postAddProduct.ts

import axiosInstance from '@/api/axiosInstance';
import { AxiosResponse } from 'axios';

type ProductOption = {
  optionName: string;
  additionalPrice: number;
};

type AddProductRequest = {
  packaging: string;
  discountRatePercent: number;
  origin: string;
  price: number;
  deliveryCompany: string;
  harvestPeriod: string; // "YYYY-MM-DD"
  name: string;
  deliverySchedule: number;
  productOptions: ProductOption[];
  totalStock: string;
  deliveryFee: number;
  additionalInfo: string;
  volume: string;
  description: string;
  expirationDate: string;
};

export const PostAddProduct = async (
  data: AddProductRequest,
  mainImage: File,
  descriptionImages: File[]
): Promise<AxiosResponse<any>> => {
  const formData = new FormData();

  console.log('전송 데이터', data, mainImage, descriptionImages);

  // ✅ Blob으로 감싸 JSON으로 인식되게 처리
  const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  formData.append('addProductRequestDto', jsonBlob);

  // ✅ 정확한 키명, 공백 제거
  formData.append('mainImage', mainImage);

  // ✅ 배열 처리: 같은 key로 여러 파일 append
  descriptionImages.forEach((file) => {
    formData.append('descriptionImages', file);
  });

  try {
    const response = await axiosInstance.post('/api/products', formData);

    console.log('상품 등록 완료:', response.data);
    return response;
  } catch (error) {
    console.error('상품 등록 실패:', error);
    throw error;
  }
};
