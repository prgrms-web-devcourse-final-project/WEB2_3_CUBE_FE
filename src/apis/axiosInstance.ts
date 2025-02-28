import axios from 'axios';
import { refreshAccessTokenAPI } from './login';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

// 요청 인터셉터
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const accessToken = cookies.get('accessToken');

//     if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      console.error('네트워크 오류 또는 서버 응답 없음:', error.message);
      return Promise.reject(error);
      // 로그아웃
      // await logoutAPI();
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      const refreshToken = cookies.get('refreshToken');

      if (!refreshToken) {
        console.error('🚨 Refresh Token이 없습니다. 다시 로그인하세요.');
        // 로그아웃 로직
        return Promise.reject(error);
      }
      try {
        const response = await refreshAccessTokenAPI(refreshToken);
        // 기존 요청에 새로운 토큰 추가 후 재요청

        cookies.set('accessToken', response.accessToken, {
          path: '/',
          maxAge: 1209600,
        });
        cookies.set('refreshToken', response.refreshToken, {
          path: '/',
          maxAge: 1209600,
        });
        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error('🚨 Refresh Token이 만료되었습니다. 다시 로그인하세요.');
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  },
);

export default axiosInstance;
