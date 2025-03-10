import axiosInstance from './axiosInstance';
const API_URL = 'api';

/**
 *
 * @param size 한번에 조회할 포인트 내역 갯수
 * @param cursor 마지막 조회한 포인트 내역 ID
 * @returns
 */
export const getPointHistory = async (size: number, cursor: number) => {
  const response = await axiosInstance.get(
    `/${API_URL}/points/history?size=${size}&cursor=${cursor}`,
  );
  return response.data;
};

/**
 * @returns
 */
export const getPointBalance = async (userId:number) => {
  const response = await axiosInstance.get(`/${API_URL}/points/balance?userId=${userId}`);
  return response.data;
};
