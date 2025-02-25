import axios from 'axios';
import { logoutAPI } from './login';

const axiosInstance = axios.create({
  baseURL: 'http://3.39.182.150',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

// 요청 인터셉터
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = sessionStorage.getItem('accessToken');
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
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
    if (error.response?.status === 401) {
      console.error('네트워크 오류 또는 서버 응답 없음:', error.message);
      // 로그아웃
      // await logoutAPI();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
