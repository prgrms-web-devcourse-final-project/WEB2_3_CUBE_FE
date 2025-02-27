interface Notification {
  id: number;
  type: 'GUESTBOOK' | 'MUSIC_COMMENT' | 'EVENT' | 'HOUSE_MATE';
  senderId: number;
  senderNickName: string;
  senderProfileImage: string;
  targetId: number;
  content?: string;
  createdAt: string;
  isRead: boolean;
}

export interface NotificationResponse {
  notifications: Notification[];
  hasNext: boolean;
  nextCursor: string;
}
