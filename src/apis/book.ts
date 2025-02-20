import axiosInstance, { aladinInstance } from './axiosInstance';

const ALADIN_KEY = import.meta.env.VITE_ALADIN_KEY;

export const bookAPI = {
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
    };

    const response = await aladinInstance.get('/ttb/api/ItemSearch.aspx', {
      params,
    });
    return response.data;
  },

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
      "category": "Fiction",
      "page": 270
}
   */
  getBookDetail: async (myBookId: string) => {
    const response = await axiosInstance.get(`/api/mybooks/${myBookId}`);
    return response.data;
  },

  /**
   * 서평 조회
   * @param myBookId 내 책 ID
   * @returns
   * {
        "id": 1,
        "title": 제목,
        "quote": 인상 깊은 구절,
        "takeaway": 느낀점/그 때 나의 감정,
        "motive" : 책을 선택하게 된 계기
        "topic" : 다른 사람과 나누고 싶은 대화 주제
        "freeFormText": 자유 형식 글,
        "coverColor": 커버 색상
    }
   * @example
   * const review = await bookAPI.getReview('1');
   * console.log(review);
   */
  getReview: async (myBookId: string) => {
    const response = await axiosInstance.get(
      `/api/mybooks-review?myBookId=${myBookId}`,
    );
    return response.data;
  },
};
