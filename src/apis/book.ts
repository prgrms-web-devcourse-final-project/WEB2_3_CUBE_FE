import axiosInstance from './axiosInstance';

export const bookAPI = {
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
