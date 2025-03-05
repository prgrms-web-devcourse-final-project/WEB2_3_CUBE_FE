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
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private connectionStatus: 'CONNECTING' | 'CONNECTED' | 'DISCONNECTED' =
    'DISCONNECTED';

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_API_URL}/ws`),
      connectHeaders: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
      onConnect: () => {
        console.log('웹소켓 연결 성공');
        console.log('현재 사용자:', useUserStore.getState().user);
        this.connectionStatus = 'CONNECTED';

        // 연결 직후 구독 상태 확인
        setTimeout(() => {
          console.log('구독 상태:', {
            isConnected: this.client.connected,
            connectionStatus: this.connectionStatus,
          });
        }, 1000);

        this.reconnectAttempts = 0;
        this.sendUserStatus('ONLINE');
        this.subscribeToNotifications();
        this.subscribeToUserStatus();
      },
      onDisconnect: () => {
        console.log('웹소켓 연결 해제');
        this.connectionStatus = 'DISCONNECTED';
      },
      onStompError: (frame) => {
        console.error('Stomp 에러:', frame);
        this.handleConnectionError();
      },
      onWebSocketError: (event) => {
        console.error('웹소켓 에러:', event);
        this.handleConnectionError();
      },
      debug: (msg: string) => {
        console.log('STOMP Debug:', msg); // STOMP 디버그 메시지 추가
      },
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
        this.disconnect(); // 일정 시간 활동 없으면 연결 해제
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

  private handleConnectionError() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectTimeout = setTimeout(() => {
        console.log(
          `재연결 시도 ${this.reconnectAttempts + 1}/${
            this.maxReconnectAttempts
          }`,
        );
        this.reconnectAttempts++;
        this.connect();
      }, 2000 * Math.pow(2, this.reconnectAttempts)); // 지수 백오프
    }
  }

  connect() {
    try {
      this.client.activate();
    } catch (error) {
      console.error('웹소켓 연결 실패:', error);
      this.handleConnectionError();
    }
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    this.reconnectAttempts = 0;
    if (this.client.connected) {
      this.sendUserStatus('OFFLINE');
      this.client.deactivate();
    }
  }

  private subscribeToNotifications() {
    const user = useUserStore.getState().user;
    if (!user) {
      console.error('사용자 정보 없음');
      return;
    }

    const subscriptionPath = `/user/${user.userId}/notification`;
    console.log('알림 구독 시작:', subscriptionPath);

    try {
      const subscription = this.client.subscribe(
        subscriptionPath,
        (message: Message) => {
          console.log('메시지 수신 시도');
          console.log('원본 메시지:', message);

          try {
            const notification = JSON.parse(message.body);
            console.log('파싱된 알림:', notification);

            // 구독 정보 저장 추가
            this.subscriptions['notifications'] = () =>
              subscription.unsubscribe();

            window.dispatchEvent(
              new CustomEvent('newNotification', {
                detail: notification,
              }),
            );
          } catch (error) {
            console.error('알림 처리 실패:', error);
          }
        },
      );
    } catch (error) {
      console.error('구독 실패:', error);
    }
  }

  private subscribeToUserStatus() {
    this.client.subscribe('/topic/status', (message) => {
      const statusUpdate = JSON.parse(message.body);
      window.dispatchEvent(
        new CustomEvent('userStatusChange', {
          detail: statusUpdate,
        }),
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
        status,
      }),
    });
  }

  unsubscribeAll() {
    Object.values(this.subscriptions).forEach((unsubscribe) => unsubscribe());
  }

  isConnected() {
    return this.connectionStatus === 'CONNECTED';
  }
}

export const webSocketService = new WebSocketService();
