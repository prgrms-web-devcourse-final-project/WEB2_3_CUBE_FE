export interface SearchItemType {
  id: string;
  title: string;
  author: string; // 작가 or 가수
  date: string; // 출판일자 or 발매일자
  imageUrl: string; // 책 표지 or 앨범 커버
  type: 'CD' | 'BOOK';
  genres: string[];
}

// API 응답 타입 --------------------------
interface BookAPIResponse {
  code: string;
  data: {
    books: {
      id: string;
      title: string;
      author: string;
      publisher: string;
      publishedDate: string;
      imageUrl: string;
      genres: string[];
    }[];
  };
  message: string;
}

interface MusicAPIResponse {
  data: {
    results: {
      youtubeVideoId: string;
      title: string;
      artist: string;
      album: string;
      coverUrl: string;
      duration: number;
      genres?: string[];
    }[];
    count: number;
  };
  message: string;
}
