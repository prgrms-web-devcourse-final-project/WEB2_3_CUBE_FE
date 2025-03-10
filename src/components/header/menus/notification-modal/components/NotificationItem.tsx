import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatToKoreanFullDate } from '@/utils/dateFormat';
import { NotificationMessage } from './NotificationMessage';
import { useUserStore } from '@/store/useUserStore';
import exProfile from '@assets/rank/exProfile.png';
interface NotificationItemProps {
  notification: Notification;
  onRead: (id: number) => void;
  activeTab: 'pendingRead' | 'viewed';
  onClose: () => void;
}

export const NotificationItem = memo(
  ({ notification, onRead, activeTab, onClose }: NotificationItemProps) => {
    const navigate = useNavigate();
    const { user } = useUserStore();

    const handleClick = () => {
      // 읽지 않음 탭에서만 read 요청을 보냄
      if (activeTab === 'pendingRead' && !notification.isRead) {
        onRead(notification.notificationId);
      }
      onClose();
      // 알림 타입에 따른 이동 처리
      switch (notification.type) {
        case 'GUESTBOOK':
          navigate(`/room/${user.userId}`);
          break;
        case 'MUSIC_COMMENT':
          navigate(`/cd/${notification.targetId}/user/${user.userId}`);
          break;
        case 'HOUSE_MATE':
          navigate(`/profile/${notification.senderId}`);
          break;
        case 'EVENT':
          navigate(`/event`);
          break;
        default:
          break;
      }
    };

    const handleProfileClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose();
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
          {notification.type !== 'EVENT' && (
            <img
              src={notification.senderProfileImage || exProfile}
              alt={`${notification.senderNickName}님의 프로필`}
              className='object-cover w-10 h-10 rounded-full cursor-pointer hover:opacity-80'
              onClick={handleProfileClick}
            />
          )}
          <div aria-label='알림 내용'>
            <p className='flex gap-1 items-center'>
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
