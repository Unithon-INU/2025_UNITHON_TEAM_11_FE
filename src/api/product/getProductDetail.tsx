import axios, { AxiosResponse } from "axios";
import { ParamValue } from "next/dist/server/request/params";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const GetProductDetail = async (
    productId: ParamValue,
    page: number,
): Promise<any> => {
  axios.defaults.withCredentials = true;

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  try {
    const response: AxiosResponse<any> = await axios.get(
      `${apiUrl}/api/products/${productId}?page=${page}`,{
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {},
    }
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