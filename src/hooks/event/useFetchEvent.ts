import { getOngoingEvent } from '@apis/event';
import { useEffect, useState } from 'react';

export const useFetchEvent = () => {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const fetchData = async () => {
    try {
      const result = await getOngoingEvent();
      setEventInfo(result);
    } catch (error) {
      setIsError('이벤트 정보를 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return {
    eventInfo,
    isLoading,
    isError,
  };
};
