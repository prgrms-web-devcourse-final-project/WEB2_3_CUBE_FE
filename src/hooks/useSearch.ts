import { SearchItemType } from '@/types/search';
import { useState, useEffect } from 'react';
import { bookAPI } from '@apis/book';
import axios from 'axios';
import { useDebounce } from './useDebounce';

// SPOTIFY accesstoken 얻는 로직
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_SECRET_KEY;

const getSpotifyToken = async () => {
  const auth = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const res = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return res.data.access_token;
};

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

      const token = await getSpotifyToken();
      const encodedQuery = encodeURIComponent(searchQuery);
      const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&market=KR&limit=10`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.tracks.items.map((music: CDSearch) => ({
        id: music.id,
        title: music.name,
        artist: music.artists[0].name,
        album_title: music.album.name,
        date: music.album.release_date,
        imageUrl: music.album.images[1].url,
        type: 'CD' as const,
        genres: [],
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
