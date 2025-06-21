export type RecipeStep = {
  stepOrder: number;
  description: string;
  imageUrl: string;
};

export type RecipeDetail = {
  member:{
    imageUrl:string;
    introduction:string;
    likeCount:string;
    memberId:number;
    nickname:string;
  }
  isLiked: boolean;
  likeCount: number;
  title: string;
  content: string;
  imageUrl: string;
  rating: number;
  headCount: number;
  cookingTime: string;
  difficulty: string;
  createdAt: string;
  ingredients: Record<string, string>; // 예: { 두부: "1모", 된장: "2스푼" }
  sauces: Record<string, string>; // 예: { 간장: "1스푼" }
  steps: RecipeStep[];
  reviews: string; // 추후 필요시 구체적인 타입으로 대체 가능
  totalReviewCount: number;
  recentImageUrls: string[];
  comments: string[]; // 추후 필요시 구체적인 타입으로 대체 가능
};
