import  { AxiosResponse } from "axios";
import { ParamValue } from "next/dist/server/request/params";
import axiosInstance from "@/api/axiosInstance";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const PostMemberLike = async (
  memberId: ParamValue | number
): Promise<any> => {
  console.log("전송 데이터", memberId);

  try {
    const response: AxiosResponse<any> = await axiosInstance.post(
      `${apiUrl}/api/likes/member/${memberId}`,
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
