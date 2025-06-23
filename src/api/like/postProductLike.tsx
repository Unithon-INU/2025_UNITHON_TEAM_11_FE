import axios, { AxiosResponse } from "axios";
import axiosInstance from "@/api/axiosInstance";

export const PostProductLike = async (
  productId: number
): Promise<any> => {
  console.log("전송 데이터", productId);
  axios.defaults.withCredentials = true;

  try {

    const response: AxiosResponse<any> = await axiosInstance.post(
      `/api/likes/product/${productId}`,
      null, // POST body가 없으므로 null
      
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
