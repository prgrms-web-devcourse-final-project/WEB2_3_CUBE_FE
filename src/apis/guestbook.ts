import axiosInstance from "./axiosInstance";

const API_URL = 'api';

export const guestbookAPI = {
  // ------------------------------ 방명록 삭제 ------------------------------
  /**
    * 특정 guestbookId의 방명록 삭제
    * @param guestbookId 삭제할 방명록 ID
    * @param userId 사용자 ID
  */
    deleteGuestbook: async (guestbookId: number, userId: number) => {
      try {
        await axiosInstance.delete(`/${API_URL}/guestbooks/${guestbookId}?userId=${userId}`);
      } catch (error) {
        console.error('방명록 삭제 API 호출 오류:', error);
        throw error;
      }
    },
  
  // ------------------------------ 방명록 조회 ------------------------------
  /**
    * 특정 roomId의 방명록 조회
    * @param roomId 방 ID
    * @param page 페이지 번호
    * @param size 페이지 크기
    * @returns 방명록 데이터
  */
  getGuestbook: async (roomId: number, page: number, size: number) => {
    try{
      const response = await axiosInstance.get(`/${API_URL}/guestbooks/${roomId}`, {
        params: {page, size},
      });
      return response.data;
    } catch (error) {
      console.error('방명록 조회 API 호출 오류:', error);
      throw error;
    }
  },

  // ------------------------------ 방명록 글 등록 ------------------------------
    /**
    * 특정 roomId의 방명록 등록
    * @param roomId 방 ID
    * @param userId 사용자 ID
    * @param message 작성할 메시지
    * @returns 등록된 방명록 데이터
  */
  createGuestbook: async (roomId:number, userId: number, message:string) => {
    try{
      const response = await axiosInstance.post(
        `/${API_URL}/guestbooks/${roomId}?userId=${userId}`, 
        { message });
      return response.data;
    } catch(error){
      console.error('방명록 등록 API 호출 오류:', error);
      throw error;
    }
  }
}