import { memo } from 'react';
import { Notification } from '@/types/notification';
import { formatToKoreanFullDate } from '@/utils/dateFormat';
import { NotificationMessage } from './NotificationMessage';

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: number) => void;
}

export const NotificationItem = memo(
  ({ notification, onRead }: NotificationItemProps) => {
    return (
      <li
        onClick={() => {
          if (!notification.isRead) {
            onRead(notification.notificationId);
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
