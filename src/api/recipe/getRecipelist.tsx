import axios, { AxiosResponse } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { Recipe } from "@/types/Recipe";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const GetRecipeList = async (
  page:number
): Promise<Recipe[]> => {
 
  try {
    const response: AxiosResponse<any> = await axiosInstance.get(
      `${apiUrl}/api/recipes/list?page=${page}`,
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