import axios, { AxiosResponse } from "axios";
import axiosInstance from "@/api/axiosInstance";


export const PostRecipe = async (
  title: string,
  content: string,
  headCount: number,
  cookingTime: string,
  difficulty: string,
  ingredients: Record<string, string>,
  sauces: Record<string, string>,
  steps: { stepOrder: number; description: string }[],
  mainImage: File,
  descriptionImages: File[]
): Promise<any> => {
  try {
    const formData = new FormData();

    const recipeRequestDto = {
      title,
      content,
      headCount,
      cookingTime,
      difficulty,
      ingredients,
      sauces,
      steps,
    };

    // ✅ JSON 데이터 직렬화 후 FormData에 추가
    formData.append("recipeRequestDto", new Blob([JSON.stringify(recipeRequestDto)], { type: "application/json" }));

    // ✅ 대표 이미지 추가
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    // ✅ 설명 이미지 배열 추가
    if (descriptionImages && descriptionImages.length > 0) {
      descriptionImages.forEach((file) => {
        formData.append("descriptionImages", file);
      });
    }

    // ✅ 요청 전송
    const response: AxiosResponse<any> = await axiosInstance.post(
      `/api/recipes`,
      formData
    );

    console.log("레시피 등록 응답:", response.data);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error("Error response:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};
