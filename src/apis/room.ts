import axiosInstance from './axiosInstance';

const API_URL = 'api';

export const roomAPI = {
  // ------------------------------ 방 조회 ------------------------------
  /**
   * 특정 userId의 방 정보 조회
   * @param userId 조회할 방의 유저 ID
   * @returns 방 정보 데이터
   */
  getRoomById: async (userId: number) => {
    try {
      const response = await axiosInstance.get(
        `/${API_URL}/rooms?userId=${userId}`,
      );
      return response.data;
    } catch (error) {
      console.error('방 정보 조회 API 호출 오류:', error);
      throw error;
    }
  },
  // ------------------------------ 방 테마 변경 ------------------------------
  /**
   * 특정 roomId의 테마 변경
   * @param roomId 방 ID
   * @param userId 사용자 ID
   * @param themeName 변경할 테마 (basic, forest, marine)
   */
  updateRoomTheme: async (
    roomId: number,
    userId: number,
    themeName: 'BASIC' | 'FOREST' | 'MARINE',
  ) => {
    try {
      const response = await axiosInstance.put(
        `/${API_URL}/rooms/${roomId}?userId=${userId}`,
        {
          themeName,
        },
      );
      return response.data;
    } catch (error) {
      console.error('방 테마 변경 API 호출 오류:', error);
      throw error;
    }
  },
  // ------------------------------ 가구 수정 ------------------------------
  /**
   * 특정 roomId의 가구 설정 변경
   * @param roomId 방 ID
   * @param userId 사용자 ID
   * @param furnitureType 변경할 가구 설정 (BOOKSHELF, CD_RACK)
   */
  updateRoomFurniture: async (
    roomId: number,
    userId: number,
    furnitureType: string,
  ) => {
    try {
      const response = await axiosInstance.put(
        `/${API_URL}/rooms/${roomId}/furniture?userId=${userId}`,
        { furnitureType },
      );
      return response.data;
    } catch (error) {
      console.error('방 가구 설정 변경 API 호출 오류:', error);
      throw error;
    }
  },
  // ------------------------------ 방문(랭킹 집계) By userId ------------------------------
  /**
   * 다른 사용자의 방을 방문하고 랭킹 점수 부여 (userId 기준)
   * @param visitorId 방문하는 유저의 ID
   * @param hostId 방의 소유자 ID
   */
  visitedRoomByUserId: async (
    visitorId: number,
    hostId: number,
  ) => {
    try {
      const response = await axiosInstance.put(
        `/${API_URL}/rooms/visit?visitorId=${visitorId}&hostId=${hostId}`
      );
      return response.data;
    } catch (error) {
      console.error('방문 API 호출 오류:', error);
      throw error;
    }
  },
    // ------------------------------ 방문(랭킹 집계) By roomId ------------------------------
  /**
   * 다른 사용자의 방을 방문하고 랭킹 점수 부여 (roomId 기준)
   * @param visitorId 방문하는 유저의 ID
   * @param roomId 사용자 ID
   */
  visitedRoomByRoomId: async (
    visitorId: number,
    roomId: number,
  ) => {
    try {
      const response = await axiosInstance.put(
        `/${API_URL}/rooms/visit/${roomId}?visitorId=${visitorId}
`
      );
      return response.data;
    } catch (error) {
      console.error('방문 API 호출 오류:', error);
      throw error;
    }
  },
};
