import SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';
import { getCookie } from '../utils/cookie';
import { useUserStore } from '@/store/useUserStore';

interface NotificationMessage {
  notificationId: number;
  type: string;
  timestamp: string;
  receiverId: number;
}

class WebSocketService {
  private client: Client;
  private subscriptions: { [key: string]: () => void } = {};

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_API_URL}/ws`),
      connectHeaders: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
      onConnect: () => {
        console.log('웹소켓 연결 성공');
        this.subscribeToNotifications();
      },
      onDisconnect: () => {
        console.log('웹소켓 연결 해제');
      },
      onStompError: (frame) => {
        console.error('Stomp 에러:', frame);
      }
    });
  }

  connect() {
    this.client.activate();
  }

  disconnect() {
    this.client.deactivate();
  }

  private subscribeToNotifications() {
    const user = useUserStore.getState().user;
    if (!user) {
      console.error('사용자 정보가 없습니다');
      return;
    }

    const subscription = this.client.subscribe(
      `/user/${user.userId}/notification`,
      (message: Message) => {
        const notification: NotificationMessage = JSON.parse(message.body);
        const event = new CustomEvent('newNotification', {
          detail: notification
        });
        window.dispatchEvent(event);
      }
    );

    this.subscriptions['notifications'] = () => subscription.unsubscribe();
  }

  unsubscribeAll() {
    Object.values(this.subscriptions).forEach(unsubscribe => unsubscribe());
  }
}

export const webSocketService = new WebSocketService();