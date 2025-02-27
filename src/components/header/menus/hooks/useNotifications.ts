import { useState, useCallback, useEffect } from 'react';
import { notificationAPI } from '@/apis/notification';
import { Notification } from '@/types/notification';

type TabType = 'pendingRead' | 'viewed';

export const useNotifications = (isOpen: boolean) => {
  const [activeTab, setActiveTab] = useState<TabType>('pendingRead');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);

  const fetchNotifications = useCallback(
    async (reset = false, currentTab?: TabType) => {
      if (isFetching) return;

      try {
        setIsFetching(true);
        if (reset) {
          setIsLoading(true);
        }

        const response = await notificationAPI.getNotifications(
          reset ? undefined : cursor ? Number(cursor) : undefined,
          20,
          (currentTab || activeTab) === 'viewed',
        );

        setNotifications((prev) =>
          reset ? response.notifications : [...prev, ...response.notifications],
        );
        setHasMore(response.hasNext);
        setCursor(response.nextCursor || undefined);
      } catch (error) {
        console.error('알림 목록 조회 실패:', error);
      } finally {
        setIsFetching(false);
        if (reset) {
          setIsLoading(false);
        }
      }
    },
    [cursor, isFetching, activeTab],
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
    fetchNotifications(true, tab);
  };

  useEffect(() => {
    if (isOpen) {
      setNotifications([]);
      setCursor(undefined);
      setHasMore(true);
      fetchNotifications(true, activeTab);
    }
  }, [isOpen]);

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
