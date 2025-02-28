import axiosInstance from "./axiosInstance";

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
        const response = await axiosInstance.get(`/${API_URL}/rooms?userId=${userId}`);
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
    updateRoomTheme: async (roomId: number, userId:number, themeName: 'basic' | 'forest' | 'marine') => {
      try{
        const response = await axiosInstance.put(`/${API_URL}/rooms/${roomId}?userId=${userId}`,{
          themeName,
        });
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
    updateRoomFurniture: async (roomId:number, userId:number, furnitureType:string) => {
      try{
        const response = await axiosInstance.put(
          `/${API_URL}/rooms/${roomId}/furniture?userId=${userId}`, 
          { furnitureType: furnitureType } );
        return response.data;
      } catch (error) {
        console.error('방 가구 설정 변경 API 호출 오류:', error);
        throw error;
      }
    },
}