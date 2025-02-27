import { useRef, useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps {
  fetchMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

export const useInfiniteScroll = ({
  fetchMore,
  isLoading,
  hasMore,
}: UseInfiniteScrollProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!listRef.current || isLoading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      fetchMore();
    }
  }, [fetchMore, isLoading, hasMore]);

  useEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    listElement.addEventListener('scroll', handleScroll);
    return () => {
      listElement.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { listRef, observerRef };
};
