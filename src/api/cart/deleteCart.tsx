import axios, { AxiosResponse } from "axios";
import axiosInstance from "@/api/axiosInstance";

export const DeleteCart = async (

): Promise<any> => {
  axios.defaults.withCredentials = true;

  try {
    const response: AxiosResponse<any> = await axiosInstance.delete(
      `/api/carts`,
     
      
    );

    console.log(response.data);
    console.log(response.headers);

    return response;
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
