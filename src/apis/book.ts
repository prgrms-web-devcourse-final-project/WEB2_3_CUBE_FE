import axios from 'axios';
import axiosInstance from './axiosInstance';
import { BookType, ReviewType } from '@/types/book';

const ALADIN_KEY = import.meta.env.VITE_ALADIN_KEY;
const API_URL = 'api';

export const bookAPI = {
  // ------------------------------ 검색 ------------------------------
  /**
   * 알라딘 도서 검색
   * @param keyword 검색 키워드
   * @returns 알라딘 도서 검색 결과
   */
  searchAladinBooks: async (keyword: string) => {
    const params = {
      ttbkey: ALADIN_KEY,
      Query: keyword,
      QueryType: 'Keyword',
      MaxResults: 10,
      start: 1,
      SearchTarget: 'Book',
      output: 'JS',
      Version: '20131101',
      Cover: 'Big',
    };

    try {
      const response = await axios.get('/api/aladin/ttb/api/ItemSearch.aspx', {
        params,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      if (response.data && typeof response.data === 'string') {
        return JSON.parse(response.data);
      }
      return response.data;
    } catch (error) {
      console.error('알라딘 API 호출 오류:', error);
      throw error;
    }
  },
  // ------------------------------ 책장 ------------------------------
  /**
   * 내 책장 조회
   * @param userId 사용자 ID
   * @param pageSize 페이지 크기
   * @param lastBookId 마지막으로 조회한 책 ID (첫 페이지 조회 시 제외)
   * @param keyword 검색 키워드
   * @returns 책장 목록
   * {
   * "myBooks": [
   *   {
   *     "id": 5,
   *     "title": "Love in the Time of Cholera",
   *     "author": "Gabriel Garcia Marquez",
   *     "publisher": "Knopf",
   *     "publishedDate": "2015-07-07",
   *     "imageUrl": "http://example.com/book10.jpg",
   *     "category": "Fiction",
   *     "page": 270
   *   },
   *   {
   *     "id": 4,
   *     "title": "Sapiens: A Brief History of Humankind",
   *     "author": "Yuval Noah Harari",
   *     "publisher": "Harvill Secker",
   *     "publishedDate": "2020-05-01",
   *     "imageUrl": "http://example.com/book9.jpg",
   *     "category": "Non-fiction",
   *     "page": 230
   *   }
   * ],
   * "count": 5
   * }
   * @example
   * // 첫 페이지 조회
   * const firstPage = await bookAPI.getBookCaseList(1, 10);
   * // 두 번째 페이지부터 조회
   * const nextPage = await bookAPI.getBookCaseList(1, 10, 2);
   * // 검색어로 조회
   * const searchResult = await bookAPI.getBookCaseList(1, 10, undefined, "해리포터");
   */
  getBookCaseList: async (
    userId: number,
    pageSize: number,
    lastBookId?: number,
    keyword?: string,
  ) => {
    let url = `/${API_URL}/mybooks?userId=${userId}&pageSize=${pageSize}`;

    if (lastBookId) {
      url += `&lastBookId=${lastBookId}`;
    }

    if (keyword) {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }

    const response = await axiosInstance.get(url);
    return response.data;
  },

  /** 내 책장에 도서 추가하기
   * @param book 도서 정보
   * {
   *   isbn: item.id,
   *   title: item.title,
   *   author: item.author,
   *   publisher: item.publisher,
   *   publishedDate: item.date,
   *   imageUrl: item.imageUrl,
   *   genreNames: item.genres,
   * }
   * @returns
   */
  addBookToMyBook: async (book: BookType, userId: number) => {
    const response = await axiosInstance.post(
      `${API_URL}/mybooks?userId=${userId}`,
      book,
    );
    return response.data;
  },

  /** 등록된 도서 삭제
   * @param userId 사용자 ID
   * @param myBookId 내 책 ID
   * @example
   * const response = await bookAPI.deleteBookFromMyBook('1', '8,7');
   */
  deleteBookFromMyBook: async (userId: string, myBookId: string) => {
    const response = await axiosInstance.delete(`/${API_URL}/mybooks`, {
      params: {
        userId,
        myBookIds: myBookId,
      },
    });
    return response.data;
  },

  // ------------------------------ 책 상세 ------------------------------
  /**
   * 도서 상세 조회
   * @param myBookId 내 책 ID
   * @returns
   * {
      "id": 5,
      "title": "Love in the Time of Cholera",
      "author": "Gabriel Garcia Marquez",
      "publisher": "Knopf",
      "publishedDate": "2015-07-07",
      "imageUrl": "http://example.com/book10.jpg",
      "genreNames": ["Fiction"],
      "page": 270
}
   */
  getBookDetail: async (myBookId: string) => {
    const response = await axiosInstance.get(`/${API_URL}/mybooks/${myBookId}`);
    return response.data;
  },

  // ------------------------------ 서평 ------------------------------
  /**
   * 서평 조회
   * @param myBookId 내 책 ID
   * @returns
   * {
   *   "id": 1,
   *   "title": 제목,
   *   "quote": 인상 깊은 구절,
   *   "takeaway": 느낀점/그 때 나의 감정,
   *   "motivate": 책을 선택하게 된 계기,
   *   "topic": 다른 사람과 나누고 싶은 대화 주제,
   *   "freeFormText": 자유 형식 글,
   *   "coverColor": 커버 색상
   * }
   * @example
   * const review = await bookAPI.getReview('1');
   * // console.log(review);
   */
  getReview: async (myBookId: string) => {
    const response = await axiosInstance.get(
      `/${API_URL}/mybooks/${myBookId}/review`,
    );
    return response.data;
  },

  /**
   * 서평 등록
   * @param review 서평 정보
   * @returns
   * {
   *   "id": 1,
   *   "title": 제목,
   *   "quote": 인상 깊은 구절,
   *   "takeaway": 느낀점/그 때 나의 감정,
   *   "freeFormText": 자유 형식 글,
   *   "motivate" : 책을 선택하게 된 계기
   *   "topic" : 다른 사람과 나누고 싶은 대화 주제
   *   "coverColor": 커버 색상
   * }
   * @example
   * const review = await bookAPI.addReview('1', {
   *   title: '제목',
   *   quote: '인상 깊은 구절',
   *   takeaway: '느낀점/그 때 나의 감정',
   *   freeFormText: '자유 형식 글',
   *   motivate: '책을 선택하게 된 계기',
   *   topic: '다른 사람과 나누고 싶은 대화 주제',
   *   coverColor: '커버 색상',
   * });
   */

  addReview: async (myBookId: string, review: ReviewType) => {
    const response = await axiosInstance.post(
      `/${API_URL}/mybooks/${myBookId}/review`,
      review,
    );
    return response.data;
  },

  /**
   * 서평 수정
   * @param myBookId 내 책 ID
   * @param review 서평 정보
   * @returns
   */
  updateReview: async (myBookId: string, review: ReviewType) => {
    const response = await axiosInstance.patch(
      `/${API_URL}/mybooks/${myBookId}/review`,
      review,
    );
    return response.data;
  },

  /**
   * 서평 삭제
   * @param myBookId 내 책 ID
   * @returns
   */
  deleteReview: async (myBookId: string) => {
    const response = await axiosInstance.delete(
      `/${API_URL}/mybooks/${myBookId}/review`,
    );
    return response.data;
  },

  // ------------------------------ 책 레벨 업그레이드 ------------------------------
  /**
   * 책장 업그레이드
   * @param userId 사용자 ID
   * @returns
   */
  upgradeBookLevel: async (userId: string) => {
    const response = await axiosInstance.post(
      `/${API_URL}/rooms/${userId}/furniture/bookshelf/upgrade`,
    );
    return response.data;
  },
};
