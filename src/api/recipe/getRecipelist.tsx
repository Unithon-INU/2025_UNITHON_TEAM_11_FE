import axios, { AxiosResponse } from "axios";
import axiosInstance from "@/api/axiosInstance";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const GetRecipeList = async (
  page:number
): Promise<any> => {
 
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