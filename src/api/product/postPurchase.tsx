import axios, { AxiosResponse } from "axios";
import axiosInstance from "@/api/axiosInstance";

export interface DeliveryRequestDto {
  name: string;
  phoneNumber: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  deliveryMessage: string;
}

export interface PurchaseItem {
  productId: number;
  productOption: string;
  quantity: number;
  productPrice: number;
}

export interface PurchasePayload {
  items: PurchaseItem[];
  deliveryRequestDto: DeliveryRequestDto;
  paymentMethod: string;
  productPrice: number;
  deliveryFee: number;
  totalPrice: number;
}

export const PostPurchase = async (
  payload: PurchasePayload
): Promise<any> => {
  console.log("전송 데이터", payload);
  axios.defaults.withCredentials = true;

  try {
    const response: AxiosResponse<any> = await axiosInstance.post(
      `/api/purchases`,
      payload
    );

    console.log("응답 데이터", response.data);
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
