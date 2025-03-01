import DataList from '@components/datalist/DataList';
import React, { useState, useEffect } from 'react';

const TestPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [cdList, setCdList] = useState<DataListInfo[]>([]);

  const generateDummyData = (cursorId: number) => {
    return Array.from({ length: 14 }, (_, index) => ({
      id: String(cursorId + index + 1),
      title: `Test Song ${cursorId + index + 1}`,
      artist: `Artist ${cursorId + index + 1}`,
      released_year: '2024',
      album: `Album ${cursorId + index + 1}`,
    }));
  };

  useEffect(() => {
    const initialData = generateDummyData(0);
    setCdList(initialData);
    setCursor(14); // 다음 페이지의 시작점
  }, []);

  // 추가 데이터 로드 함수
  const fetchMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newData = generateDummyData(cursor || 0);

      // 더미 데이터가 50개를 넘어가면 더 이상 로드하지 않음
      if (cdList.length + newData.length >= 50) {
        setHasMore(false);
      }

      setCdList((prev) => [...prev, ...newData]);
      setCursor((prev) => (prev || 0) + 14);
    } catch (error) {
      console.error('Error fetching more data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-screen h-screen bg-gray-100'>
      <DataList
        datas={cdList}
        type='cd'
        hasMore={hasMore}
        isLoading={isLoading}
        fetchMore={fetchMore}
        userId={2}
      />
    </div>
  );
};

export default TestPage;
