import axios, { AxiosResponse } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { Cart } from "@/types/Cart";
export const PutMyProfile = async (
   nickname:string,
   introduction:string,
   image:File | null
): Promise<any> => {

  try {
    const formData = new FormData();
    const mypageRequestDto   = {
      nickname: nickname,
      introduction: introduction
    };

   // Blob 대신 JSON 문자열 직접 사용
    formData.append("mypageRequestDto", JSON.stringify(mypageRequestDto));


    if(image){
    const Image = image;

    formData.append("image", Image);
    }

    const response: AxiosResponse<any> = await axiosInstance.put(
      `/api/mypage`,
      formData,
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
