interface GuestbookMessageType {
  guestbookId: number;
  userId: number;
  nickname: string;
  profileImage?: string;
  message: string;
  createdAt: string;
  relation?: string;
}

interface GuestbookMessageProps {
  messages: Message[];
  userId: number;
  ownerId: number;
  onDelete: (guesbookId:number) => void
}