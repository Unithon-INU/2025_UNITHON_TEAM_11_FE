import axios, { AxiosResponse } from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const PostSignup = async (
  email: string | string[],
  username: string,
  password: string,
  nickname: string,
  introduction: string,
  profileImage: File | null
): Promise<any> => {
  console.log("전송 데이터", email, nickname, username, password, introduction);
  axios.defaults.withCredentials = true;
  try {
    const formData = new FormData();
    const signupRequestDto = {
      email: email,
      nickname: nickname,
    };

    formData.append(
      "signupRequestDto",
      JSON.stringify(signupRequestDto)
    );

    if(profileImage){
    const userImage = profileImage;

    formData.append("image", userImage);
    }

    // axios 요청 보내기
    const response: AxiosResponse<any> = await axios.post(
      `${apiUrl}/api/members/signup`,
      formData, // JSON 문자열로 전송
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
