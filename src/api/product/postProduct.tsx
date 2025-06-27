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
  descriptionImages=[]
): Promise<AxiosResponse<any>> => {
  const formData = new FormData();

  console.log('전송 데이터', data, mainImage, descriptionImages);
  // dto JSON 문자열로 변환 후 append
  const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  formData.append('addProductRequestDto', jsonBlob);

  // 대표 이미지
  formData.append('mainImage', mainImage);

  // 상세 이미지 배열
  descriptionImages.forEach((img) => {
    formData.append('descriptionImages', img);
  });

  try {
    const response = await axiosInstance.post('/api/products', formData, 
    );

    console.log('상품 등록 완료:', response.data);
    return response;
  } catch (error) {
    console.error('상품 등록 실패:', error);
    throw error;
  }
};
