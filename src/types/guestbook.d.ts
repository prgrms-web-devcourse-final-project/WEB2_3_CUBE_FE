interface GuestbookMessageType {
  guestbookId: number;
  userId: number;
  nickname: string;
  profileImage?: string;
  message: string;
  createdAt: string;
  relation?: string;
}

interface GuestbookProps {
  onClose: () => void;
  ownerName: string;
  ownerId: number;
}

interface GuestbookMessageProps {
  messages: Message[];
  userId: number;
  ownerId: number;
  refetchGuestbook: ()=> void;
  onDelete: ()=> void
}