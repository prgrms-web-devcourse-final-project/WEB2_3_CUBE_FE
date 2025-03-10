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
  // ----------------------- 잠금 해제한 테마 목록 조회 ------------------------------
  /**
   * 해당 사용자가 잠금 헤자한 방 테마 목록을 반환한다.
   * @param userId 사용자 ID
   */
  getUnlockThemes: async (userId: number) => {
    try {
      const response = await axiosInstance.get(
        `/${API_URL}/rooms/${userId}/unlocked-themes`,
      );
      return response.data;
    } catch (error) {
      console.error('잠금 해제 테마 조회 API 호출 오류:', error);
      throw error;
    }
  },
  // ----------------------- 테마 구매 ------------------------------
  /**
   * 해당 사용자가 잠금 헤자한 방 테마 목록을 반환한다.
   * @param userId 사용자 ID
   */
  purchaseThemes: async (roomId: number, themeName: string) => {
    try {
      const response = await axiosInstance.post(
        `/${API_URL}/rooms/${roomId}/purchase-theme`,{
          themeName,
        }
      );
      return response.data;
    } catch (error) {
      console.error('테마 구매 API 호출 오류:', error);
      throw error;
    }
  },
};
