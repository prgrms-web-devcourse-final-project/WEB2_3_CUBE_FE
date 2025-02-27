import { useState, useCallback, useEffect } from 'react';
import { notificationAPI } from '@/apis/notification';
import { Notification } from '@/types/notification';

type TabType = 'pendingRead' | 'viewed';

export const useNotifications = (isOpen: boolean) => {
  const [activeTab, setActiveTab] = useState<TabType>('pendingRead');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<number | undefined>(undefined);

  const fetchNotifications = useCallback(
    async (reset = false) => {
      try {
        setIsLoading(true);
        const status = activeTab === 'pendingRead' ? 'UNREAD' : 'READ';
        const response = await notificationAPI.getNotifications(
          reset ? undefined : cursor,
          20,
          status,
        );

        setNotifications((prev) =>
          reset ? response.notifications : [...prev, ...response.notifications],
        );
        setHasMore(response.hasNext);
        setCursor(response.nextCursor || undefined);
      } catch (error) {
        console.error('알림 목록 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [activeTab, cursor],
  );

  const handleReadNotification = async (notificationId: number) => {
    try {
      await notificationAPI.readNotification(notificationId);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.notificationId === notificationId
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
    }
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setNotifications([]);
    setCursor(undefined);
    setHasMore(true);
    fetchNotifications(true);
  };

  // 모달이 열릴 때 알림 목록 조회
  useEffect(() => {
    if (isOpen) {
      setNotifications([]);
      setCursor(undefined);
      setHasMore(true);
      fetchNotifications(true);
    }
  }, [isOpen, fetchNotifications]);

  return {
    activeTab,
    notifications,
    isLoading,
    hasMore,
    fetchNotifications,
    handleReadNotification,
    handleTabChange,
  };
};
