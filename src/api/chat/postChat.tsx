import axios, { AxiosResponse } from "axios";

const apiUrl = 'https://13.209.42.199.nip.io';

export const PostChat = async (
    message: string,
): Promise<any> => {
  console.log("전송 데이터", message);
  axios.defaults.withCredentials = true;

  try {
    const response: AxiosResponse<any> = await axios.post(
        `${apiUrl}/chat`,
        {
            message: message,
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
