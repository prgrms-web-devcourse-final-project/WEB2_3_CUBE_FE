import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { Toast } from '@components/Toast';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { refreshAccessTokenAPI } from '@apis/login';
function App() {
  const [cookies] = useCookies(['accessToken', 'refreshToken']);
  const [isTokenRefreshing, setIsTokenRefreshing] = useState(false);

  console.log('App 랜더링');
  useEffect(() => {
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;
    const fetchTokenData = async () => {
      if (!accessToken && refreshToken && !isTokenRefreshing) {
        setIsTokenRefreshing(true);
        try {
          const response = await refreshAccessTokenAPI(refreshToken);
          console.log(response);
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
    <BrowserRouter>
      <Toast />
      <Router />
    </BrowserRouter>
  );
}

export default App;
