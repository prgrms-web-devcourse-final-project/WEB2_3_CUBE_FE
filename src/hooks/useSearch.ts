import { SearchItemType } from '@/types/search';
import { useState, useEffect } from 'react';
import { bookAPI } from '@apis/book';
import { useDebounce } from './useDebounce';
import { searchSpotifyCds } from '@apis/cd';

export const useSearch = (type: 'CD' | 'BOOK') => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchItemType[]>([]);

  const debouncedQuery = useDebounce(query, 1500);

  // 책 검색 API 호출
  const searchBooks = async (
    searchQuery: string,
  ): Promise<SearchItemType[]> => {
    if (!searchQuery.trim()) return [];

    try {
      setIsLoading(true);
      setError(null);

      const data = await bookAPI.searchAladinBooks(searchQuery);

      return data.item
        .filter(
          (book) => book.categoryId !== 0 && !book.title.startsWith('[세트]'), // 상품 제외 (categoryId : 0) ,세트 제외
        )
        .map((book) => ({
          id: book.isbn,
          title: book.title,
          author: book.author.split('(')[0].trim(),
          publisher: book.publisher,
          date: book.pubDate,
          imageUrl: book.cover,
          type: 'BOOK' as const,
          genres: book.categoryName.split('>').slice(1),
        }));
    } catch (error: any) {
      console.error(error);
      setError(`검색 중 오류가 발생했습니다`);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // 음악 검색 API 호출
  const searchMusics = async (
    searchQuery: string,
  ): Promise<SearchItemType[]> => {
    if (!searchQuery.trim()) return [];

    try {
      setIsLoading(true);
      setError(null);

      const data = await searchSpotifyCds(searchQuery);

      return data.map((cd: CDSearchResult) => ({
        id: cd.id,
        title: cd.title,
        artist: cd.artist,
        album_title: cd.album_title,
        date: cd.date,
        imageUrl: cd.imageUrl,
        type: 'CD' as const,
        genres: cd.genres,
        youtubeUrl: cd.youtubeUrl,
        duration: cd.duration,
      }));
    } catch (error: any) {
      console.error(error);
      setError(`검색 중 오류가 발생했습니다`);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // 디바운스된 쿼리가 변경될 때마다 검색 실행
  useEffect(() => {
    const searchFunction = type === 'BOOK' ? searchBooks : searchMusics;

    const performSearch = async () => {
      const searchResults = await searchFunction(debouncedQuery);
      setResults(searchResults);
    };

    performSearch();
  }, [debouncedQuery, type]);

  return {
    query,
    setQuery,
    results,
    isLoading: isLoading,
    error,
  };
};
