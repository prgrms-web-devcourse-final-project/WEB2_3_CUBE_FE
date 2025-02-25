// cd response body type
interface CDInfo {
  cdId: number;
  myCdId: number;
  title: string;
  artist: string;
  releaseDate: string;
  genres: string[];
  coverUrl: string;
  youtubeUrl: string;
  album?: string;
  duration: number;
}

// cd 검색시 type
interface CDSearch {
  id: string;
  name: string;
  artists: { name: string; id: string }[]; // 가수 정보가 배열로 옴
  album: {
    name: string;
    releaseDate: string;
    images: { url: string }[]; // 앨범 이미지도 배열
  };
  genres: string[];
  youtubeUrl: string;
  duration: number;
}

// cd 검색후 response type
interface CDSearchResult {
  id: string;
  title: string;
  artist: string;
  album_title: string;
  date: string;
  imageUrl: string;
  genres: string[];
  type: 'CD';
  youtubeUrl: string;
  duration: number;
  releaseDate?: string;
}

// cd 추가시 reqest body type
interface PostCDInfo {
  title: string;
  artist: string;
  album: string;
  genres: string[];
  coverUrl: string;
  youtubeUrl: string;
  duration: number;
  releaseDate?: string;
}
