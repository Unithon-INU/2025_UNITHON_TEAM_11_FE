import axios, { AxiosResponse } from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const GetEmail = async (
    email: string
): Promise<any> => {
  axios.defaults.withCredentials = true;
  try {
    const response: AxiosResponse<any> = await axios.get(
      `${apiUrl}/api/members/email/${email}`
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