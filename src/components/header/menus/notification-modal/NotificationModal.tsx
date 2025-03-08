import { BaseModal } from '../modal/BaseModal';
import { TabMenu } from '../modal/TabMenu';
import { EmptyState } from '../modal/EmptyState';
import { useInfiniteScroll } from '../../../../hooks/useInfiniteScroll';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationItem } from './components/NotificationItem';
import NotificationSkeletonItem from './components/NotificationSkeletonItem';
import { useEffect } from 'react';
import { notificationAPI } from '@apis/notification';
import { useUserStore } from '@/store/useUserStore';

type TabType = 'pendingRead' | 'viewed';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  onNotificationStatusChange: (hasUnread: boolean) => void;
}

const TABS = [
  { id: 'pendingRead' as const, label: '읽지 않음' },
  { id: 'viewed' as const, label: '읽음' },
];

const NotificationModal = ({
  isOpen,
  onClose,
  buttonRef,
  onNotificationStatusChange,
}: NotificationModalProps) => {
  const {
    activeTab,
    notifications,
    isLoading,
    hasMore,
    fetchNotifications,
    handleReadNotification,
    handleTabChange,
  } = useNotifications(isOpen);

  const { listRef, observerRef } = useInfiniteScroll({
    fetchMore: () => fetchNotifications(false),
    isLoading,
    hasMore,
  });

  const handleNotificationsUpdate = (hasUnread: boolean) => {
    // // console.log('알림 상태 업데이트:', hasUnread);
    onNotificationStatusChange(hasUnread);
  };

  useEffect(() => {
    const checkUnreadNotifications = async () => {
      const user = useUserStore.getState().user;
      if (!user) return;

      try {
        const response = await notificationAPI.getNotifications(
          user.userId,
          undefined,
          20,
          false, // 읽지 않은 알림만 조회
        );
        const hasUnread = response.notifications.some(
          (notification) => !notification.isRead,
        );
        handleNotificationsUpdate(hasUnread);
      } catch (error) {
        console.error('알림 상태 확인 실패:', error);
      }
    };

    if (isOpen) {
      checkUnreadNotifications();
    }
  }, [isOpen]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      buttonRef={buttonRef}
      title='알림'>
      <TabMenu
        activeTab={activeTab}
        tabs={TABS}
        onTabChange={handleTabChange}
      />

      <ul
        ref={listRef}
        className='overflow-y-auto max-h-[calc(100vh-400px)] flex flex-col gap-6 px-4 scrollbar'>
        {isLoading ? (
          <div className='flex flex-col gap-6'>
            {Array.from({ length: 5 }).map((_, index) => (
              <NotificationSkeletonItem key={`skeleton-${index}`} />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <EmptyState message='알림이 없습니다.' />
        ) : (
          <>
            {notifications.map((notification) => (
              <NotificationItem
                key={`notification-${notification.notificationId}`}
                notification={notification}
                onRead={handleReadNotification}
                activeTab={activeTab}
                onClose={onClose}
              />
            ))}
            {hasMore && (
              <div
                ref={observerRef}
                className='py-2'>
                {isLoading && (
                  <div className='flex flex-col gap-6'>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <NotificationSkeletonItem
                        key={`skeleton-more-${index}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </ul>
    </BaseModal>
  );
};

export default NotificationModal;
