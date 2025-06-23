import { Product } from "@/components/detail/ProductGridList";
import { RawReview } from "./Review";

// types/ProductDetail.ts
export type ProductDetail = {
  bestProducts:Product[]
  member: {
    imageUrl:string;
    introduction:string;
    likeCount:number;
    memberId:number;
    nickname:string;
    isSeller: boolean;
    isLiked: boolean;
  };
  isLiked: boolean;
  name: string;
  description: string;
  reviews: RawReview[];
  mainImageUrl: string;
  descriptionImageUrls: string | string[]; // 백엔드 응답이 string일 수도 있고, 배열일 수도 있으니 대응
  rating: number;
  price: number;
  salePrice: number;
  deliveryCompany: string;
  deliveryFee: number;
  deliverySchedule: string;
  totalStock: string;
  volume: string;
  origin: string;
  harvestPeriod: string;
  expirationDate: string;
  relatedProducts: string; // 쉼표로 구분된 string이면 필요 시 split() 사용
  packaging: string;
  additionalInfo: string;
  totalReviewCount: number;
  totalImageCount: number;
  recentImageUrls: string[];
};
