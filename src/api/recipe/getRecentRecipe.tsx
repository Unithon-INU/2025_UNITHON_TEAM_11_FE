import axios, { AxiosResponse } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { Recipe } from "@/types/Recipe";

export const GetRecentRecipe = async (
  page:number
): Promise<Recipe[]> => {
 
  try {
    const response: AxiosResponse<any> = await axiosInstance.get(
      `/api/mypage/recent/recipes?page=${page}`,
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