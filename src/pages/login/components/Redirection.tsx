import { loginAPI } from '@apis/login';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Redirection() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const authorization = searchParams.get('accessToken');

  const navigate = useNavigate();

  const getAuthData = async () => {
    try {
      await loginAPI(authorization);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAuthData();
  }, [authorization]);
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
