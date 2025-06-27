import axios, { AxiosResponse } from "axios";
import { ParamValue } from "next/dist/server/request/params";
import axiosInstance from "@/api/axiosInstance";
import { Product } from "@/types/Product";


export const PutPurchase = async (
    purchaseId : number,
   
): Promise<any> => {
  axios.defaults.withCredentials = true;


  try {
    const response: AxiosResponse<any> = await axiosInstance.get(
      `/api/purchases/${purchaseId}`,
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