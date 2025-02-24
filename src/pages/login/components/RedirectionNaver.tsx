import { loginAPI } from '@apis/login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RedirectionNaver() {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();
  const getAuthData = async () => {
    try {
      await loginAPI('NAVER', code);
      navigate('/');
    } catch (error) {
      console.error(error);
      navigate('/login');
    }
  };

  useEffect(() => {
    getAuthData();
  }, []);

  return (
    <div className='animate-spin'>
      <div>
        <svg
          className='mr-3 size-5 animate-spin ...'
          viewBox='0 0 24 24'></svg>
      </div>
    </div>
  );
}
