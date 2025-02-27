import { useRef, useEffect, useState, useCallback } from 'react';
import closeIcon from '@/assets/notification-modal-close-icon.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { notificationAPI } from '@/apis/notification';
import { Notification } from '@/types/notification';
import { formatToKoreanFullDate } from '@/utils/dateFormat';

type TabType = 'pendingRead' | 'viewed';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const NotificationModal = ({
  isOpen,
  onClose,
  buttonRef,
}: NotificationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [modalPosition, setModalPosition] = useState('0px');
  const [activeTab, setActiveTab] = useState<TabType>('pendingRead');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<number | undefined>(undefined);

  // 모달 위치 계산 함수
  const updateModalPosition = () => {
    if (buttonRef.current) {
      const position = `calc(100% - ${
        buttonRef.current.getBoundingClientRect().left
      }px + 16px)`;
      setModalPosition(position);
    }
  };

  // 알림 목록 조회
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

  // 알림 읽음 처리
  const handleReadNotification = async (notificationId: number) => {
    try {
      await notificationAPI.readNotification(notificationId);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
    }
  };

  // 무한 스크롤 처리
  const handleScroll = useCallback(() => {
    if (!listRef.current || isLoading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      fetchNotifications();
    }
  }, [fetchNotifications, isLoading, hasMore]);

  useEffect(() => {
    if (isOpen) {
      updateModalPosition();
      window.addEventListener('resize', updateModalPosition);
    }

    return () => {
      window.removeEventListener('resize', updateModalPosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  // 탭 변경 시 알림 목록 초기화 후 재조회
  useEffect(() => {
    if (isOpen) {
      setNotifications([]);
      setCursor(undefined);
      setHasMore(true);
      fetchNotifications(true);
    }
  }, [activeTab, isOpen]);

  if (!isOpen) return null;

  const getNotificationMessage = (notification: Notification) => {
    const nickName = (
      <span className='font-bold'>{notification.senderNickName}</span>
    );

    switch (notification.type) {
      case 'GUESTBOOK':
        return <p>{nickName}님이 방명록을 남겼어요!</p>;
      case 'MUSIC_COMMENT':
        return <p>{nickName}님이 내 음악에 댓글을 남겼어요!</p>;
      case 'EVENT':
        return '새로운 이벤트가 있습니다!';
      case 'HOUSE_MATE':
        return <p>{nickName}님이 하우스 메이트로 추가했어요!</p>;
      default:
        return notification.content || '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed z-50'
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95, x: 20 }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
          style={{
            width: '440px',
            height: '80vh',
            right: modalPosition,
            top: '40px',
          }}>
          <motion.div
            ref={modalRef}
            className='w-full h-full p-3 border-2 border-white bg-white/30 backdrop-blur-lg rounded-3xl'
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(8px)' }}
            transition={{ duration: 0.3 }}>
            <div className='w-full h-full bg-[#FCF7FD] p-11 rounded-2xl'>
              {/* 닫기 버튼 */}
              <button
                onClick={onClose}
                className='absolute right-10 top-10'
                aria-label='닫기'>
                <img
                  src={closeIcon}
                  alt='닫기'
                  className='w-6 h-6'
                />
              </button>

              <h2 className='text-2xl font-bold text-[#162C63] mb-6'>알림</h2>

              {/* 탭 메뉴 */}
              <div className='flex bg-[#EBEFFB] rounded-lg mb-4 h-10 p-1 relative'>
                <motion.div
                  className='absolute w-[48%] h-8 bg-[#2C5FBD]/80 rounded-md'
                  animate={{
                    x: activeTab === 'viewed' ? '103%' : '0',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 26,
                  }}
                />
                <button
                  onClick={() => setActiveTab('pendingRead')}
                  className={`flex-1 font-medium text-sm rounded-md relative z-10 transition-colors duration-300 ${
                    activeTab === 'pendingRead'
                      ? 'text-white'
                      : 'text-[#3E507D]'
                  }`}>
                  읽지 않음
                </button>
                <button
                  onClick={() => setActiveTab('viewed')}
                  className={`flex-1 font-medium text-sm rounded-md relative z-10 transition-colors duration-300 ${
                    activeTab === 'viewed' ? 'text-white' : 'text-[#3E507D]'
                  }`}>
                  읽음
                </button>
              </div>

              {/* 알림 리스트 */}
              <ul
                ref={listRef}
                onScroll={handleScroll}
                className='overflow-y-auto max-h-[calc(100vh-400px)] flex flex-col gap-6 px-4'>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    onClick={() => {
                      if (!notification.isRead) {
                        handleReadNotification(notification.id);
                      }
                    }}
                    className={`gap-3 item-between cursor-pointer transition-opacity hover:opacity-80 ${
                      !notification.isRead ? 'opacity-100' : 'opacity-60'
                    }`}>
                    <div
                      aria-label='프로필 정보'
                      className='gap-2 item-middle'>
                      <img
                        src={notification.senderProfileImage}
                        alt={`${notification.senderNickName}님의 프로필`}
                        className='object-cover w-10 h-10 rounded-full'
                      />
                      <div aria-label='알림 내용'>
                        <p className='flex items-center gap-1'>
                          <span
                            aria-label='알림 내용'
                            className='text-[#162C63] text-sm'>
                            {getNotificationMessage(notification)}
                          </span>
                        </p>
                        <span
                          aria-label='날짜'
                          className='text-xs text-[#3E507D]/70'>
                          {formatToKoreanFullDate(notification.createdAt)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
                {isLoading && (
                  <div className='text-center text-[#3E507D]/70'>
                    로딩 중...
                  </div>
                )}
                {!isLoading && notifications.length === 0 && (
                  <div className='text-center text-[#3E507D]/70'>
                    알림이 없습니다.
                  </div>
                )}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
