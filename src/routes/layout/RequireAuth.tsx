import { logoutAPI, refreshAccessTokenAPI } from '@apis/auth';
import Loading from '@components/Loading';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function RequireAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cookies] = useCookies(['accessToken', 'refreshToken']);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async () => {
    try {
      const accessToken = cookies.accessToken;
      const refreshToken = cookies.refreshToken;

      // 모든 토큰이 없는 경우
      if (!accessToken && !refreshToken) {
        if (location.pathname !== '/login')
          navigate('/login', { replace: true });
      }

      // accessToken이 있는 경우
      if (accessToken) {
        if (location.pathname === '/login') navigate('/', { replace: true });
      }

      // accessToken은 없지만 refreshToken이 있는 경우 (재발급 로직)
      if (!accessToken && refreshToken) {
        try {
          await refreshAccessTokenAPI(refreshToken);
          if (location.pathname === '/login') {
            navigate('/', { replace: true });
          }
        } catch (refreshError) {
          await logoutAPI();
          navigate('/login', { replace: true });
          throw new Error(refreshError);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, [location.pathname]);

  if (isLoading) {
    return <Loading />; // 로딩 상태 표시
  }
  return <Outlet />;
}
