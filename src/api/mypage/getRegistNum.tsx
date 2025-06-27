// api/getMain.ts
import { AxiosResponse } from "axios";
import axiosInstance from "@/api/axiosInstance"; // ✅ 우리가 만든 인터셉터 적용된 인스턴스

export const GetRegistNum = async (registNum:string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axiosInstance.get(`/api/mypage/registNum/${registNum}`);

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
