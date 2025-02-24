import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function RequireAuth() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    // 토큰이 없고 현재 login 페이지가 아니면 login 페이지로 리디렉트
    if (!token && location.pathname !== '/login') {
      navigate('/login', { replace: true });
      // 토큰이 있고 현재 login 페이지면 메인 페이지로 리디렉트
    } else if (token && location.pathname === '/login') {
      navigate('/', { replace: true });
    }

    setShow(true);
  }, [navigate, location]);

  return <>{show && <Outlet />}</>;
}
