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
  try {
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

    return data;
  } catch (error) {
    console.log(error);
    await logoutAPI();
  }
};

export const refreshAccessTokenAPI = async () => {
  try {
    const { data } = await axiosInstance.post(`/${API_URL}/auth/reissue-token`);

    sessionStorage.setItem('accessToken', data.access_token);
    sessionStorage.setItem(
      'expiryTime',
      data.expires_in + Math.floor(Date.now() / 1000),
    );
    return data;
  } catch (error) {
    console.error(error);
    // refreshToken의 유효기간도 지났을 경우
    await logoutAPI();
  }
};

export const logoutAPI = async () => {
  try {
    const response = await axiosInstance.post(`/${API_URL}/auth/logout`);
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('expiryTime');
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
