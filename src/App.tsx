import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { Toast } from '@components/Toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { webSocketService } from './apis/websocket';
import { useEffect } from 'react';

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    // 앱이 시작될 때 웹소켓 연결
    webSocketService.connect();

    // 앱이 종료될 때 웹소켓 연결 해제
    return () => {
      webSocketService.disconnect();
    };
  }, []);


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
