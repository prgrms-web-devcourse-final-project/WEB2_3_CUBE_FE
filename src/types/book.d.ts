import { BookThemeType } from '@/constants/bookTheme';

export interface BookType {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publishedDate: string;
  imageUrl: string;
  genreNames: string[];
  page: number;
}

export interface ReviewType {
  title: string;
  quote: string;
  takeaway: string;
  freeFormText: string;
  motivate: string;
  topic: string;
  coverColor: string;
}

export interface BookCaseListType {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publishedDate: string;
  imageUrl: string;
  genreNames: string[];
  page: number;
}

export interface BookReviewData {
  // 도서 정보 (API로 받아올 정보)
  bookTitle: string;
  author: string;
  genreNames: string[];
  publishedDate: string;
  imageUrl?: string; // 책 표지 이미지 URL 추가

  // 리뷰 정보 (사용자 입력)
  title: string;
  writeDateTime: string; // reviewDate를 writeDateTime으로 변경
  theme: BookThemeType;
  quote: string;
  emotion: string;
  reason: string;
  discussion: string;
  freeform: string;
}
