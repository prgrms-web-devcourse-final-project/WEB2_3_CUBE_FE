import axios from 'axios';
import { tokenService } from '@/utils/token';

const axiosInstance = axios.create({
  baseURL: 'http://3.39.182.150',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
  (error) => {
    if (error.response?.status === 401) {
      console.error('네트워크 오류 또는 서버 응답 없음:', error.message);
      tokenService.clearAll();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
