import axios, { AxiosResponse } from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const PostReviewLike = async (
  reviewId: number
): Promise<any> => {
  console.log("전송 데이터", reviewId);
  axios.defaults.withCredentials = true;

  try {
    const accessToken = localStorage.getItem('accessToken'); // 또는 쿠키 등에서 꺼낼 수도 있음

    const response: AxiosResponse<any> = await axios.post(
      `${apiUrl}/api/likes/review/${reviewId}`,
      null, // POST body가 없으므로 null
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // ✅ 헤더에 토큰 추가
        },
      }
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
