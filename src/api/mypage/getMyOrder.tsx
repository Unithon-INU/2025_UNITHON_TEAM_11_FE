// api/getMain.ts
import { AxiosResponse } from "axios";
import axiosInstance from "@/api/axiosInstance"; // ✅ 우리가 만든 인터셉터 적용된 인스턴스
import { OrderItem } from "@/app/mypage/order/page"; // ✅ 타입 정의 파일에서 OrderItem 타입 가져오기

export const GetMyOrder = async (page:number): Promise<OrderItem[]> => {
  try {
    const response: AxiosResponse<any> = await axiosInstance.get(`/api/mypage/orders?page=${page}`);

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    // 에러 로깅은 그대로 유지
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
