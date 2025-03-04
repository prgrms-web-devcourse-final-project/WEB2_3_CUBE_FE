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
  private inactivityTimeout: NodeJS.Timeout | null = null;
  private readonly INACTIVE_THRESHOLD = 10 * 60 * 1000; // 10분

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_API_URL}/ws`),
      connectHeaders: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
      onConnect: () => {
        console.log('웹소켓 연결 성공');
        this.sendUserStatus('ONLINE');
        this.subscribeToNotifications();
        this.subscribeToUserStatus();
      },
      onDisconnect: () => {
        console.log('웹소켓 연결 해제');
      }
    });

    this.setupActivityListeners();
  }

  private setupActivityListeners() {
    const handleActivity = () => {
      // 활동이 감지되면 기존 타이머를 리셋
      if (this.inactivityTimeout) {
        clearTimeout(this.inactivityTimeout);
      }

      // 연결이 끊어진 상태였다면 다시 연결
      if (!this.client.connected) {
        this.connect();
      }

      // 새로운 비활성 타이머 시작
      this.inactivityTimeout = setTimeout(() => {
        this.disconnect();  // 일정 시간 활동 없으면 연결 해제
      }, this.INACTIVE_THRESHOLD);
    };

    // 사용자 활동 감지
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);
    
    // 탭 전환 감지
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.disconnect();
      } else {
        this.connect();
      }
    });
  }

  connect() {
    if (!this.client.connected) {
      this.client.activate();
    }
  }

  disconnect() {
    if (this.client.connected) {
      this.sendUserStatus('OFFLINE');
      this.client.deactivate();
    }
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

  private subscribeToUserStatus() {
    this.client.subscribe('/topic/status', (message) => {
      const statusUpdate = JSON.parse(message.body);
      window.dispatchEvent(
        new CustomEvent('userStatusChange', {
          detail: statusUpdate
        })
      );
    });
  }

  private sendUserStatus(status: 'ONLINE' | 'OFFLINE' | 'AWAY') {
    const user = useUserStore.getState().user;
    if (!user) return;

    this.client.publish({
      destination: '/app/status',
      body: JSON.stringify({
        userId: user.userId,
        status
      })
    });
  }

  unsubscribeAll() {
    Object.values(this.subscriptions).forEach(unsubscribe => unsubscribe());
  }
}

export const webSocketService = new WebSocketService();