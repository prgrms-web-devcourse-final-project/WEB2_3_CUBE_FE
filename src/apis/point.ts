import axiosInstance from './axiosInstance';
const API_URL = 'api';

export const getPointHistory = async (
  size: number,
  itemCursor?: number,
  dayCursor?: string,
) => {
  const url = dayCursor
    ? `/${API_URL}/points/history?size=${size}&itemCursor=${itemCursor}&dayCursor=${dayCursor}`
    : `/${API_URL}/points/history?size=${size}&itemCursor=${itemCursor}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

/**
 * @returns
 */
export const getPointBalance = async (userId: number) => {
  const response = await axiosInstance.get(
    `/${API_URL}/points/balance?userId=${userId}`,
  );
  return response.data;
};
