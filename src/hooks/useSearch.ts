import {
  BookAPIResponse,
  MusicAPIResponse,
  SearchItemType,
} from '@/types/search';
import { mockBooks, mockMusics } from '@/mocks/searchData';
import { useState } from 'react';
import axiosInstance from '@apis/axiosInstance';
import { bookAPI } from '@apis/book';

import axios from 'axios';

// SPOTIFY accesstoken 얻는 로직
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_SECRET_KEY;

const getSpotifyToken = async () => {
  const auth = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`); // Base64 인코딩

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

  return res.data.access_token; // 액세스 토큰 반환
};

export const useSearch = (type: 'CD' | 'BOOK') => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 책 검색 API 호출
  const searchBooks = async (query: string): Promise<SearchItemType[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await bookAPI.searchAladinBooks(query);

      return data.item.map((book) => ({
        id: book.isbn,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        date: book.pubDate,
        imageUrl: book.cover,
        type: 'BOOK' as const,
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
  //-----------------------------------------------------------

  // 음악 검색 API 호출
  const searchMusics = async (query: string): Promise<SearchItemType[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getSpotifyToken(); // 토큰 받아오기
      const encodedQuery = encodeURIComponent(query);
      const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&market=KR&limit=10`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.tracks.items.map((music: CDSearch) => {
        return {
          id: music.id,
          title: music.name,
          artist: music.artists[0].name,
          album_title: music.album.name,
          date: music.album.release_date,
          imageUrl: music.album.images[1].url,
          type: 'CD' as const,
          genres: [],
          // duration: music.duration_ms,
          // album: music.album.name,
          // youtube: music.youtube.url,
        };
      });

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
