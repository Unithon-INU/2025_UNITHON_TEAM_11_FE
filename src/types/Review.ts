export type RawReview = {
  id: number;
  content: string;
  createdAt: string;
  imageUrls: string[];
  likeCount: number;
  isLiked: boolean | null;
  rating: number;
  purchaseOption: string | null;
  memberInfo: {
    nickname: string;
    imageUrl: string;
    memberId: number;
  };
};