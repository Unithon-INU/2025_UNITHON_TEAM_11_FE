import axios, { AxiosResponse } from "axios";
import { ParamValue } from "next/dist/server/request/params";
import axiosInstance from "@/api/axiosInstance";


export const GetProductDetail = async (
    productId: ParamValue,
    page: number,
): Promise<any> => {


  try {
    const response: AxiosResponse<any> = await axiosInstance.get(
      `/api/products/${productId}?page=${page}`,
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