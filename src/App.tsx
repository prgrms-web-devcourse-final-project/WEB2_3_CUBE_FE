import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { Toast } from '@components/Toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { webSocketService } from './apis/websocket';
import { useEffect, useState } from 'react';

function App() {
  const queryClient = new QueryClient();
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        await webSocketService.connect();
      } catch (error) {
        console.error('웹소켓 연결 실패:', error);
      } finally {
        setIsConnecting(false);
      }
    };

    connectWebSocket();

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  // 초기 연결 중에는 로딩 표시
  if (isConnecting) return <div>연결 중...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toast />
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
