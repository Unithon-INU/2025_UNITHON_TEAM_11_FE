// api/axiosInstance.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { PostRefresh } from './postRefresh'; // refresh API
import { getAccessToken, getRefreshToken, setTokens } from '@/utils/tokenStorage'; // localStorage utils

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// ✅ 요청 시 accessToken 자동 포함
axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ✅ 응답 에러 처리 (420 핸들링)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // 420 오류 발생 + 재시도 안한 요청만 처리
    if (error.response?.status === 420 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token found');

        const newTokens = await PostRefresh(refreshToken);

        // ✅ 로컬 스토리지에 새 토큰 저장
        setTokens(newTokens.accessToken, newTokens.refreshToken);

        // ✅ Authorization 헤더 교체
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newTokens.accessToken}`,
        };

        // ✅ 원래 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패', refreshError);
        // 예: 로그아웃 처리나 로그인 페이지 이동
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
