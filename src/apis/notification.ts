import axiosInstance from './axiosInstance';
import { NotificationResponse } from '@/types/notification';

const API_URL = 'mock';

export const notificationAPI = {
  /**
   * 알림 목록 조회
   * @param cursor - 페이지네이션 커서
   * @param limit - 한 번에 가져올 알림 개수
   * @param read - 읽음 여부로 필터링 (true: 읽은 알림, false: 읽지 않은 알림)
   * @returns 알림 목록 조회 결과
   * @example
   * // 읽지 않은 알림 20개 조회
   * const result = await notificationAPI.getNotifications(undefined, 20, false);
   */
  getNotifications: async (
    cursor?: number,
    limit: number = 20,
    read?: boolean,
  ) => {
    const { data } = await axiosInstance.get<NotificationResponse>(
      `${API_URL}/notifications`,
      {
        params: {
          cursor,
          limit,
          read,
        },
      },
    );
    return data;
  },

  /**
   * 알림을 읽음 처리
   * @param notificationId - 읽음 처리할 알림 ID
   * @returns 읽음 처리 성공 여부
   * @example
   * const result = await notificationAPI.readNotification(123);
   */
  readNotification: async (notificationId: number) => {
    const { data } = await axiosInstance.patch(
      `${API_URL}/notifications/${notificationId}/read`,
    );
    return data;
  },
};
