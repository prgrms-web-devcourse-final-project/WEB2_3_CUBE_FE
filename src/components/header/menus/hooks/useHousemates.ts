import { useState, useEffect } from 'react';
import { housemateAPI } from '@/apis/housemate';
import { useUserStore } from '@/store/useUserStore';

type TabType = 'followers' | 'following';

interface Housemate {
  userId: number;
  nickname: string;
  profileImage?: string;
  bio?: string;
  status: 'ONLINE' | 'OFFLINE';
}

export const useHousemates = (isOpen: boolean) => {
  const user = useUserStore((state) => state.user);
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('followers');
  const [housemates, setHousemates] = useState<Housemate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);
  const [userStatuses, setUserStatuses] = useState<
    Record<number, 'ONLINE' | 'OFFLINE'>
  >({});

  // 웹소켓 상태 변경 이벤트 리스너
  useEffect(() => {
    const handleStatusChange = (event: CustomEvent) => {
      const { userId, status } = event.detail;
      setUserStatuses((prev) => ({
        ...prev,
        [userId]: status,
      }));
    };

    window.addEventListener(
      'userStatusChange',
      handleStatusChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        'userStatusChange',
        handleStatusChange as EventListener,
      );
    };
  }, []);

  // API 호출 로직
  const fetchHousemates = async (cursor?: number) => {
    if (!user) return;
    if (cursor === 0) {
      setIsLoading(true);
    }
    setError(null);

    try {
      const response = await (activeTab === 'followers'
        ? housemateAPI.getFollowers(cursor || 0, 20, searchValue)
        : housemateAPI.getFollowing(cursor || 0, 20, searchValue));

      if (cursor === 0) {
        setHousemates(response.housemates || []);
      } else {
        setHousemates((prev) => [...prev, ...(response.housemates || [])]);
      }

      const statuses = response.housemates.reduce(
        (acc, housemate) => ({
          ...acc,
          [housemate.userId]: housemate.status,
        }),
        {},
      );
      setUserStatuses((prev) => ({ ...prev, ...statuses }));

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
      setNextCursor(0);
      setHasMore(true);
      fetchHousemates();
    }
  }, [activeTab, isOpen]);

  // 검색어 변경 시 초기화 및 API 호출
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen) {
        setHousemates([]);
        setNextCursor(0);
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
    userStatuses,
    setUserStatuses,
  };
};
