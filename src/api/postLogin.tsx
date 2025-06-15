import axios, { AxiosResponse } from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const PostLogin = async (
    username: string,
    password: string
): Promise<any> => {
  console.log("전송 데이터", username, password);
  axios.defaults.withCredentials = true;

  try {
    const response: AxiosResponse<any> = await axios.post(
        `${apiUrl}/api/members/login`,
        {
          username: username,
          password: password,
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
