import axiosInstance from './axiosInstance';

const API_URL = 'api';

export const rankAPI = {
  // ------------------------------ 방 조회 ------------------------------
  /**
   * 상위 랭킹 조회
   * @returns 상위 10명의 사용자 랭킹 데이터
   */
  getRanking: async () => {
    try {
      const response = await axiosInstance.get(`/${API_URL}/rankings`);
      return response.data;
      console.log(response.data);
    } catch (error) {
      console.error('랭킹 조회 API 호출 오류:', error);
      throw error;
    }
  },

  /**
   * roomId로 방문하기
   * @param roomId 방문하려는 방 ID
   * @param visitorId 방문하는 사용자 ID
   */
  visitByRoomId: async (roomId: string, visitorId: string) => {
    try {
      const response = await axiosInstance.post(
        `/${API_URL}/rooms/visit/${roomId}?visitorId=${visitorId}`,
      );
      return response.data;
    } catch (error) {
      console.error('방문 API 호출 오류:', error);
      throw error;
    }
  },

  /**
   * userId로 방문하기
   * @param visitorId 방문하는 사용자 ID
   * @param hostId 방문하려는 방 소유자 ID
   */
  visitByUserId: async (visitorId: string, hostId: string) => {
    try {
      const response = await axiosInstance.post(
        `/${API_URL}/rooms/visit?visitorId=${visitorId}&hostId=${hostId}`,
      );
      return response.data;
    } catch (error) {
      console.error('방문 API 호출 오류:', error);
      throw error;
    }
  },
};
