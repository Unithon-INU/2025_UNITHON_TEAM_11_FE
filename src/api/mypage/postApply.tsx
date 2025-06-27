import axios, { AxiosResponse } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { MarketInfo } from "@/types/MarketInfo";

export const PostApply = async (
  MarketInfo: MarketInfo
): Promise<any> => {
  console.log("전송 데이터", MarketInfo);
  axios.defaults.withCredentials = true;

  try {
    const formData = new FormData();
    const applyFarmerRequestDto  = {
      restAddress: MarketInfo.restAddress,
      marketName: MarketInfo.marketName,
      postalAddress: MarketInfo.postalAddress,
      bankNum: MarketInfo.bankNum,
      name: MarketInfo.name,
      intro: MarketInfo.intro,
      phone: MarketInfo.phone,
      registNum: MarketInfo.registNum,
      defaultAddress: MarketInfo.defaultAddress,
      bank: MarketInfo.bank,
    };

   // Blob 대신 JSON 문자열 직접 사용
    formData.append("applyFarmerRequestDto ", JSON.stringify(applyFarmerRequestDto ));


    if(MarketInfo.RegistFile){
    const registFile = MarketInfo.RegistFile;

    formData.append("RegistFile", registFile);
    }

    
    if(MarketInfo.Passbook){
    const Passbook = MarketInfo.Passbook;

    formData.append("Passbook", Passbook);
    }
    
    if(MarketInfo.certifidoc){
    const certifidoc = MarketInfo.certifidoc;

    formData.append("certifidoc", certifidoc);
    }
    
    if(MarketInfo.profile){
    const profile = MarketInfo.profile;

    formData.append("profile", profile);
    }


    const response: AxiosResponse<any> = await axiosInstance.post(
      `/api/mypage/applyFarmer`,
      formData, // POST body가 없으므로 null
      
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
