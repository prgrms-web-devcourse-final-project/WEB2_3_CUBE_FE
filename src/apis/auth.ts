import { useUserStore } from '@/store/useUserStore';
import axiosInstance from './axiosInstance';
import { Cookies } from 'react-cookie';
import { ACCESS_MAX_AGE, REFRESH_MAX_AGE } from '@constants/login';
import { webSocketService } from '@/apis/websocket';

const cookies = new Cookies();
const API_URL = 'api';

export const loginAPI = async (token: string) => {
  try {
    const { data } = await axiosInstance.get(`/${API_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { accessToken, refreshToken, user } = data;

    // 토큰 정보 저장
    cookies.set('accessToken', accessToken, {
      path: '/',
    });
    cookies.set('refreshToken', refreshToken, {
      path: '/',
    });

    // user 정보 저장
    useUserStore.getState().setUser(user);

    // 웹소켓 서비스 초기화 및 연결
    webSocketService.handleLogin();

    return data;
  } catch (error) {
    console.error('로그인 API 호출 중 오류:', error);
    throw error;
  }
};

/**
 *
 * @param token 유효성 검증을 위한 refreshToken
 * @returns
 */
export const refreshAccessTokenAPI = async (refreshToken: string) => {
  const { data } = await axiosInstance.post(`/${API_URL}/auth/reissue-token`, {
    refreshToken: refreshToken,
  });
  const { accessToken } = data;
  cookies.set('accessToken', accessToken, {
    path: '/',
  });

  return data;
};

export const logoutAPI = async () => {
  if (webSocketService.isConnected()) {
    webSocketService.disconnect(true);
  }

  const response = await axiosInstance.post(`/${API_URL}/auth/logout`);

  localStorage.removeItem('user-storage');
  cookies.remove('accessToken', { path: '/' });
  cookies.remove('refreshToken', { path: '/' });

  return response.data;
};

export const initStatus = () => {
  if (webSocketService.isConnected()) {
    webSocketService.disconnect(true);
  }

  localStorage.removeItem('user-storage');
  cookies.remove('accessToken', { path: '/' });
  cookies.remove('refreshToken', { path: '/' });
};
