import { loginAPI } from '@apis/auth';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Redirection() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const token = searchParams.get('accessToken');

  const navigate = useNavigate();

  const getAuthData = useCallback(async () => {
    if (!token) {
      setError('토큰이 없습니다');
      setIsLoading(false);
      return;
    }

    try {
      await loginAPI(token);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getAuthData();
  }, [getAuthData]);
  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <p className='text-red-500'>{error}</p>
        <button
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
          onClick={() => navigate('/login')}>
          로그인으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div>
        <svg
          className='w-10 h-10 text-blue-500 animate-spin'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'>
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
        </svg>
        <p className='mt-4 text-center'>로그인 처리 중입니다...</p>
      </div>
    </div>
  );
}
