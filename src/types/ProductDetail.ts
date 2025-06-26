import { Product } from "@/components/detail/ProductGridList";
import { RawReview } from "./Review";
import { OptionItem } from "./OptionItem";

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
  descriptionImageUrls: string[] // 백엔드 응답이 string일 수도 있고, 배열일 수도 있으니 대응
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
  relatedProducts: Product[]; 
  packaging: string;
  additionalInfo: string;
  totalReviewCount: number;
  totalImageCount: number;
  recentImageUrls: string[];
  productOptions: OptionItem[];
  
};
