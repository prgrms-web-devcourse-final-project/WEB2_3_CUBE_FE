import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { Toast } from '@components/Toast';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { refreshAccessTokenAPI } from '@apis/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  const [cookies] = useCookies(['accessToken', 'refreshToken']);
  const [isTokenRefreshing, setIsTokenRefreshing] = useState(false);

  useEffect(() => {
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;

    const fetchTokenData = async () => {
      // 엑세스 토큰 재발급 로직
      if (!accessToken && refreshToken) {
        setIsTokenRefreshing(true);
        try {
          await refreshAccessTokenAPI(refreshToken);
        } catch (error) {
          console.error(error);
        } finally {
          setIsTokenRefreshing(false);
        }
      }
    };
    fetchTokenData();
  }, []);

  if (isTokenRefreshing) return <div>로딩중...</div>;

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
