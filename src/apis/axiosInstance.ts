import axios from 'axios';
import { Cookies } from 'react-cookie';
import { initStatus, refreshAccessTokenAPI } from './auth';
const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = cookies.get('accessToken');

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      const refreshToken = cookies.get('refreshToken');

      // 비로그인 상태일 경우
      if (!refreshToken) {
        console.error('🚨 Refresh Token이 없습니다. 다시 로그인하세요.');
        window.location.href = '/login';
        initStatus();
        // await logoutAPI();
        return Promise.reject(error);
      }
      try {
        const response = await refreshAccessTokenAPI(refreshToken);
        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        // 리프레시 토큰이 만료된 경우
        console.error('🚨 Refresh Token이 만료되었습니다. 다시 로그인하세요.');
        window.location.href = '/login';
        initStatus();
        // await logoutAPI();
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  },
);

export default axiosInstance;
