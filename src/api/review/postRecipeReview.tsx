import axios, { AxiosResponse } from "axios";
import axiosInstance from "@/api/axiosInstance";

export const PostRecipeReview = async (
 recipeId:number,
 rating: number,
 content: string,
 Image: File | null
): Promise<any> => {
  console.log("전송 데이터",recipeId,rating,content);
  axios.defaults.withCredentials = true;
  try {
    const formData = new FormData();
    const recipeReviewRequestDto  = {
      recipeId: recipeId,
      rating: rating,
      content: content,
      
    };

   // Blob 대신 JSON 문자열 직접 사용
    formData.append("recipeReviewRequestDto ", JSON.stringify(recipeReviewRequestDto ));


    if(Image){
    const Images = Image;

    formData.append("images", Images);
    }

    // axios 요청 보내기
    const response: AxiosResponse<any> = await axiosInstance.post(
      `/api/reviews/recipe`,
      formData,
       
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      console.error("Error response:", status, data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    throw error;
  }
};
