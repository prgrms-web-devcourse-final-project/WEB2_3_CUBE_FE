import axiosInstance from './axiosInstance';

const API_URL = 'mock';

export const notificationAPI = {
  /**
   * 알림 목록 조회
   * @param cursor - 페이지네이션 커서 (마지막으로 받은 알림 ID)
   * @param limit - 한 페이지당 조회할 알림 수
   * @param status - 읽음 여부로 필터링 (READ, UNREAD)
   * @returns 알림 목록 조회 결과
   * @example
   * // 읽지 않은 알림 20개 조회
   * const result = await notificationAPI.getNotifications(undefined, 20, 'UNREAD');
   */
  getNotifications: async (
    cursor?: number,
    limit: number = 20,
    status?: 'READ' | 'UNREAD',
  ) => {
    const params = new URLSearchParams();
    if (cursor) params.append('cursor', cursor.toString());
    if (limit) params.append('limit', limit.toString());
    if (status) params.append('status', status);

    const response = await axiosInstance.get(`/${API_URL}/notifications`, {
      params,
    });
    return response.data;
  },

  /**
   * 알림을 읽음 처리
   * @param notificationId - 읽음 처리할 알림 ID
   * @returns 읽음 처리 성공 여부
   * @example
   * const result = await notificationAPI.readNotification(123);
   */
  readNotification: async (notificationId: number) => {
    const response = await axiosInstance.patch(
      `/${API_URL}/notifications/${notificationId}/read`,
    );
    return response.data;
  },
};
