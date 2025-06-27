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

// ✅ 응답 에러 처리 (420, 401, 419, 400 핸들링)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status ?? -1;

    // ✅ 400 에러 시: 세션 만료 alert + 로그인 페이지 이동
    // if (status === 400) {
    //   alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
    //   window.location.href = '/login';
    //   return Promise.reject(error);
    // }

    const shouldRetry = [420, 401, 419].includes(status);

    if (shouldRetry && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token found');

        const newTokens = await PostRefresh(refreshToken);
        console.log('새토큰', newTokens);

        // ✅ 로컬 스토리지에 새 토큰 저장
        setTokens(newTokens.data.accessToken, newTokens.data.refreshToken);

        // ✅ Authorization 헤더 교체
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newTokens.data.accessToken}`,
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
