import {
  BookAPIResponse,
  MusicAPIResponse,
  SearchItemType,
} from '@/types/search';
import { mockBooks, mockMusics } from '@/mocks/searchData';
import { useState } from 'react';
import axiosInstance from '@apis/axiosInstance';

export const useSearch = (type: 'CD' | 'BOOK') => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 책 검색 API 호출
  const searchBooks = async (query: string): Promise<SearchItemType[]> => {
    try {
      setIsLoading(true);
      setError(null);

      // API 호출 시뮬레이션
      return new Promise((resolve) => {
        setTimeout(() => {
          const filteredBooks = mockBooks
            .filter(
              (book) =>
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase()),
            )
            .map((book) => ({
              id: book.id,
              title: book.title,
              author: book.author,
              date: book.publishedDate, // publishedDate -> date로 매핑
              imageUrl: book.imageURL, // imageURL -> imageUrl로 매핑
              type: 'BOOK' as const, // type 필드 추가
              genres: book.genres,
            }));

          setIsLoading(false);
          resolve(filteredBooks);
        }, 500);
      });

      // 실제 호출 로직 -> 삭제 금지!!
      // const { data } = await axiosInstance.get(
      //   `/api/books?keyword=?${query}`,
      // );

      // return data.data.books.map((book) => ({
      //   id: book.id,
      //   title: book.title,
      //   author: book.author,
      //   date: book.publishedDate,
      //   imageUrl: book.imageUrl,
      //   type: 'BOOK' as const,
      //   genres: book.genres || [],
      // }));
    } catch (error: any) {
      console.error(error);
      setError(`검색 중 오류가 발생했습니다`);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // 음악 검색 API 호출
  const searchMusics = async (query: string): Promise<SearchItemType[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const searchMusics = async (query: string): Promise<SearchItemType[]> => {
        try {
          setIsLoading(true);
          setError(null);

          return new Promise((resolve) => {
            setTimeout(() => {
              const filteredMusics = mockMusics
                .filter(
                  (music) =>
                    music.title.toLowerCase().includes(query.toLowerCase()) ||
                    music.artist.toLowerCase().includes(query.toLowerCase()),
                )
                .map((music) => ({
                  id: music.id,
                  title: music.title,
                  author: music.artist, // artist -> author
                  date: music.releaseDate, // releaseDate -> date
                  imageUrl: music.imageURL, // imageURL -> imageUrl
                  type: 'CD' as const, // type 추가
                  genres: music.genres,
                }));

              setIsLoading(false);
              resolve(filteredMusics);
            }, 500);
          });
        } catch (error: any) {
          setError('음악 검색 중 오류가 발생했습니다');
          return [];
        }
      };

      // 실제 호출 로직 -> 삭제 금지!!
      // const { data } = await axiosInstance.get(
      //   `/api/musics/search?query=${query}`,
      // );

      // return data.data.results.map((music) => ({
      //   id: music.youtubeVideoId,
      //   title: music.title,
      //   author: music.artist,
      //   date: new Date().toISOString().split('T')[0],
      //   imageUrl: music.coverUrl,
      //   type: 'CD' as const,
      //   genres: [],
      // }));
    } catch (error: any) {
      console.error(error);
      setError(`검색 중 오류가 발생했습니다`);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // 타입에 따라 검색 함수 선택
  const search = type === 'BOOK' ? searchBooks : searchMusics;

  return {
    search,
    isLoading,
    error,
  };
};
