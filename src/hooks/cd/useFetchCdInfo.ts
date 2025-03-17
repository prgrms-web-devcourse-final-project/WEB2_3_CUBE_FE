import { getCdInfo } from '@apis/cd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useFetchCdInfo = () => {
  const [cdInfo, setCdInfo] = useState<CDInfo | null>(null);
  const [isCdPlaying, setIsCdPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const myCdId = Number(useParams().cdId);
  const userId = Number(useParams().userId);

  useEffect(() => {
    const fetchCdInfo = async () => {
      try {
        const result = await getCdInfo(myCdId, userId);

        setCdInfo(result);
        setIsCdPlaying(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCdInfo();
  }, [myCdId, userId]);

  return {
    cdInfo,
    isCdPlaying,
    isLoading,
    userId,
    setIsCdPlaying,
  };
};
