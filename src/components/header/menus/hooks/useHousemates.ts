import { useState, useEffect } from 'react';
import { housemateAPI } from '@/apis/housemate';

type TabType = 'followers' | 'following';

interface Housemate {
  userId: number;
  nickname: string;
  profileImage?: string;
  bio?: string;
  status: 'ONLINE' | 'OFFLINE';
}

export const useHousemates = (isOpen: boolean) => {
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('followers');
  const [housemates, setHousemates] = useState<Housemate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchHousemates = async (cursor?: string) => {
    if (!cursor) {
      setIsLoading(true);
    }
    setError(null);

    try {
      const response = await (activeTab === 'followers'
        ? housemateAPI.getFollowers(
            cursor ? Number(cursor) : undefined,
            20,
            searchValue,
          )
        : housemateAPI.getFollowing(
            cursor ? Number(cursor) : undefined,
            20,
            searchValue,
          ));

      if (!cursor) {
        setHousemates(response.housemates || []);
      } else {
        setHousemates((prev) => [...prev, ...(response.housemates || [])]);
      }

      setNextCursor(response.nextCursor);
      setHasMore(response.hasNext);
    } catch (err) {
      setError('하우스메이트 목록을 불러오는데 실패했습니다.');
      console.error('하우스메이트 조회 에러:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 탭 변경 시 초기화
  useEffect(() => {
    if (isOpen) {
      setHousemates([]);
      setNextCursor(null);
      setHasMore(true);
      fetchHousemates();
    }
  }, [activeTab, isOpen]);

  // 검색어 변경 시 초기화 및 API 호출
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen) {
        setHousemates([]);
        setNextCursor(null);
        setHasMore(true);
        fetchHousemates();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, isOpen]);

  return {
    searchValue,
    setSearchValue,
    activeTab,
    setActiveTab,
    housemates,
    isLoading,
    error,
    hasMore,
    fetchHousemates,
    nextCursor,
  };
};
