import axios, { AxiosResponse } from "axios";
import axiosInstance from "@/api/axiosInstance";


export const GetBestProduct = async (
  
): Promise<any> => {
 
  try {
    const response: AxiosResponse<any> = await axiosInstance.get(
      `/api/products/best`,
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