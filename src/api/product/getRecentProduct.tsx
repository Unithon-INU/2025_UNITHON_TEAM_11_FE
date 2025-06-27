import axios, { AxiosResponse } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { Product } from "@/types/Product";


export const GetRecentProduct = async (
  page:number
): Promise<Product[]> => {
  axios.defaults.withCredentials = true;
  

  try {
    const response: AxiosResponse<any> = await axiosInstance.get(
      `/api/mypage/recent/products?page=${page}`,
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