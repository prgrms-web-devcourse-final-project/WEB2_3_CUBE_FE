import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function RequireAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cookies] = useCookies(['accessToken']);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const token = cookies.accessToken;
    setIsLoading(false);

    console.log(token);

    // if (token === undefined) {
    //   return;
    // }
    if (!token && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    } else if (token && location.pathname === '/login') {
      navigate('/', { replace: true });
    }
  }, [navigate, location.pathname, cookies.accessToken]);

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 상태 표시
  }
  return <Outlet />;
}
