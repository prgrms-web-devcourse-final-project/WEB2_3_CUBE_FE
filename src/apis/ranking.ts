import axiosInstance from "./axiosInstance";

const API_URL = 'api';

export const rankAPI = {
  // ------------------------------ 방 조회 ------------------------------
  /**
    * 상위 랭킹 조회
    * @returns 상위 10명의 사용자 랭킹 데이터
  */
  getRanking: async () => {
    try{
      const response = await axiosInstance.get(`/${API_URL}/rankings`);
      return response.data;
      console.log(response.data);
    } catch (error) {
      console.error('랭킹 조회 API 호출 오류:', error);
      throw error;
    }
  }
}