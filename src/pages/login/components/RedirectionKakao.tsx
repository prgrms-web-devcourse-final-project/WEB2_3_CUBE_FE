import { loginAPI } from '@apis/login';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RedirectionKakao() {
  const [isLoading, setIsLoading] = useState(true);
  const code = new URL(window.location.href).searchParams.get('code');

  const navigate = useNavigate();

  const getAuthData = async () => {
    try {
      await loginAPI('KAKAO', code);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAuthData();
  }, []);
  if (isLoading) return <div>Loading...</div>;

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
