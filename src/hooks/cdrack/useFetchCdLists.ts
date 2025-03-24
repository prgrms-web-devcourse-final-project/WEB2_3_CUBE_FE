import { getCdRack } from '@apis/cd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useFetchCdLists = () => {
  const [cdRackInfo, setCdRackInfo] = useState<CDRackInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cursor, setCursor] = useState(0);

  const userId = Number(useParams().userId);

  useEffect(() => {
    const fetchCds = async () => {
      try {
        setIsLoading(true);

        const result = await getCdRack(userId, 10, cursor);
        setCdRackInfo(result);
      } catch (error) {
        console.error('cd 목록을 가져오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCds();
  }, [cursor, userId]);

  return {
    cdRackInfo,
    setCdRackInfo,
    isLoading,
    setCursor,
  };
};
