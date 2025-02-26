import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { Toast } from '@components/Toast';
import { useEffect, useState } from 'react';
import { logoutAPI, refreshAccessTokenAPI } from '@apis/login';

function App() {
  const accessToken = sessionStorage.getItem('accessToken');
  const expiryTime = Number(sessionStorage.getItem('expiryTime'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAccessToken = async () => {
      try {
        if (accessToken) {
          const refreshBeforeExpire = async () => {
            if (!expiryTime) return;
            const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)

            // const refreshTimeThreshold = expiryTime - currentTime - 3580; // 만료되기 59분 40초전
            const refreshTimeThreshold = expiryTime - currentTime - 300; // 만료되기 5분전

            if (refreshTimeThreshold > 0) {
              console.log(refreshTimeThreshold);
              setTimeout(async () => {
                refreshAccessTokenAPI();
              }, refreshTimeThreshold * 1000);
            } else {
              refreshAccessTokenAPI();
            }
          };
          await refreshBeforeExpire();
        }
      } catch (error) {
        console.error(error);
        // accessToken 재발행 실패시 로그아웃
        await logoutAPI();
      } finally {
        setIsLoading(false);
      }
    };

    validateAccessToken(); // accessToken이 없으면 갱신 시도
  }, []);

  if (isLoading) return <div>LOADING...</div>;

  return (
    <BrowserRouter>
      <Toast />
      <Router />
    </BrowserRouter>
  );
}

export default App;
