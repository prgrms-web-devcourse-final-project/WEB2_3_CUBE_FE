import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notification } from '@/types/notification';
import { formatToKoreanFullDate } from '@/utils/dateFormat';
import { NotificationMessage } from './NotificationMessage';

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: number) => void;
  activeTab: 'pendingRead' | 'viewed';
}

export const NotificationItem = memo(
  ({ notification, onRead, activeTab }: NotificationItemProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
      // 읽지 않음 탭에서만 read 요청을 보냄
      if (activeTab === 'pendingRead' && !notification.isRead) {
        onRead(notification.notificationId);
      }
      // 알림 타입에 따른 이동 처리
      switch (notification.type) {
        case 'GUESTBOOK':
          navigate(`/room/${notification.targetId}`);
          break;
        case 'MUSIC_COMMENT':
          navigate(`/cd/${notification.targetId}`);
          break;
        case 'HOUSE_MATE':
          navigate(`/profile/${notification.senderId}`);
          break;
        // EVENT는 별도 처리 없음
        default:
          break;
      }
    };

    const handleProfileClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      navigate(`/profile/${notification.senderId}`);
    };

    return (
      <li
        onClick={handleClick}
        className={`gap-3 item-between cursor-pointer transition-opacity hover:opacity-80 ${
          activeTab === 'viewed' ? 'opacity-70' : 'opacity-100'
        }`}>
        <div
          aria-label='프로필 정보'
          className='gap-2 item-middle'>
          <img
            src={notification.senderProfileImage}
            alt={`${notification.senderNickName}님의 프로필`}
            className='object-cover w-10 h-10 rounded-full cursor-pointer hover:opacity-80'
            onClick={handleProfileClick}
          />
          <div aria-label='알림 내용'>
            <p className='flex items-center gap-1'>
              <span
                aria-label='알림 내용'
                className='text-[#162C63] text-sm'>
                <NotificationMessage notification={notification} />
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
    );
  },
);
