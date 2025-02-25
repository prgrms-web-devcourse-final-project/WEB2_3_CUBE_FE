import { useUserStore } from '@/store/useUserStore';
import axiosInstance from './axiosInstance';

const API_URL = 'mock';
/**
 *
 * @param provider 소셜로그인 제공자
 * @param code 인가코드
 * @returns
 */
export const loginAPI = async (provider: string, code: string) => {
  const { data } = await axiosInstance.post(
    `/${API_URL}/auth/login/${provider}`,
    {
      code: code,
    },
  );
  sessionStorage.setItem('accessToken', data.accessToken);
  sessionStorage.setItem(
    'expiryTime',
    data.expiresIn + Math.floor(Date.now() / 1000),
  );
  // user 정보 저장
  useUserStore.getState().setUser(data.user);
  console.log(data);

  return data;
  // await logoutAPI();
};

export const refreshAccessTokenAPI = async () => {
  const { data } = await axiosInstance.post(`/${API_URL}/auth/reissue-token`);

  sessionStorage.setItem('accessToken', data.access_token);
  sessionStorage.setItem(
    'expiryTime',
    data.expires_in + Math.floor(Date.now() / 1000),
  );
  return data;
};

export const logoutAPI = async () => {
  const response = await axiosInstance.post(`/${API_URL}/auth/logout`);
  sessionStorage.clear();
  return response.data;
};
