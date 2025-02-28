import { useUserStore } from '@/store/useUserStore';
import axiosInstance from './axiosInstance';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const API_URL = 'mock';

export const loginAPI = async (token: string) => {
  const { data } = await axiosInstance.get(`/${API_URL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { accessToken, refreshToken, user } = data;
  // 토큰 정보 저장
  cookies.set('accessToken', accessToken, { path: '/', maxAge: 1209600 });
  cookies.set('refreshToken', refreshToken, { path: '/', maxAge: 1209600 });

  // user 정보 저장
  useUserStore.getState().setUser(user);

  return data;
};

/**
 *
 * @param token 유효성 검증을 위한 refreshToken
 * @returns
 */
export const refreshAccessTokenAPI = async (token: string) => {
  const { data } = await axiosInstance.post(`/${API_URL}/auth/reissue-token`, {
    refreshToken: token,
  });
  const { accessToken, refreshToken } = data;
  cookies.set('accessToken', accessToken, { path: '/', maxAge: 1209600 });
  cookies.set('refreshToken', refreshToken, { path: '/', maxAge: 1209600 });
  return data;
};

export const logoutAPI = async () => {
  const response = await axiosInstance.post(`/${API_URL}/auth/logout`);

  localStorage.removeItem('user-storage');
  cookies.remove('accessToken', { path: '/' });
  cookies.remove('refreshToken', { path: '/' });
  return response.data;
};
