import { BookThemeType } from '@/constants/bookTheme';

interface ReviewData {
  // 도서 정보 (API로 받아올 정보)
  bookTitle: string;
  author: string;
  genreNames: string[];
  publishedDate: string;
  imageUrl?: string; // 책 표지 이미지 URL 추가

  // 리뷰 정보 (사용자 입력)
  title: string;
  reviewDate: string;
  theme: BookThemeType;
  quote: string;
  emotion: string;
  reason: string;
  discussion: string;
  freeform: string;
}
