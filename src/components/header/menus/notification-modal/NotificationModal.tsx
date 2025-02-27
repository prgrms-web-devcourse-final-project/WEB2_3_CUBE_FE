import { BaseModal } from '../modal/BaseModal';
import { TabMenu } from '../modal/TabMenu';
import { LoadingState } from '../modal/LoadingState';
import { EmptyState } from '../modal/EmptyState';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationItem } from './NotificationItem';

type TabType = 'pendingRead' | 'viewed';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const TABS = [
  { id: 'pendingRead' as const, label: '읽지 않음' },
  { id: 'viewed' as const, label: '읽음' },
];

const NotificationModal = ({
  isOpen,
  onClose,
  buttonRef,
}: NotificationModalProps) => {
  const {
    activeTab,
    notifications,
    isLoading,
    hasMore,
    fetchNotifications,
    handleReadNotification,
    handleTabChange,
  } = useNotifications();

  const { listRef, observerRef } = useInfiniteScroll({
    fetchMore: fetchNotifications,
    isLoading,
    hasMore,
  });

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
        className='overflow-y-auto max-h-[calc(100vh-400px)] flex flex-col gap-6 px-4'>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRead={handleReadNotification}
          />
        ))}
        {isLoading && <LoadingState />}
        {!isLoading && notifications.length === 0 && (
          <EmptyState message='알림이 없습니다.' />
        )}
        <div
          ref={observerRef}
          style={{ height: '1px' }}
        />
      </ul>
    </BaseModal>
  );
};

export default NotificationModal;
