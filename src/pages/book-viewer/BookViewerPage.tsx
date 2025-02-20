import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookAPI } from '@apis/book';
import BookReviewDisplay from './components/BookReviewDisplay';
import type { ReviewData } from '@/types/review';
import NotFoundPage from '@pages/NotFoundPage';
import { mockBooks } from '@/mocks/searchData'; // mock 데이터 import

const BookViewerPage = () => {
  const { userId, bookId } = useParams();
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 임시로 mock 데이터 사용
    const mockReviewData: ReviewData = {
      bookTitle: mockBooks[0].title,
      author: mockBooks[0].author,
      genres: mockBooks[0].genres,
      publishedDate: mockBooks[0].publishedDate,
      imageUrl: mockBooks[0].imageURL,
      title: '우리가 빛의 속도로 갈 수 없다면',
      reviewDate: '2024.01.02',
      theme: 'BLUE',
      quote: '인상 깊은 구구절절',
      emotion: '그때의 감정은 솰라솰라 그때의 감정은 솰라솰라 그때의 감정은 솰라솰라 그때의 감정은 솰라솰라 ',
      reason: '선택 계기입니다.',
      discussion: '대화 주제입니다.',
      freeform: '자유 형식 내용입니다.',
    };

    setReviewData(mockReviewData);
    setIsLoading(false);
  }, [userId, bookId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!reviewData) return <NotFoundPage />;

  return (
    <section className='flex w-full h-screen overflow-auto'>
      <figure className='w-1/2 h-full p-4'>
        <img
          className='w-full h-full object-cover rounded-2xl'
          src={reviewData.imageUrl}
          alt={reviewData.bookTitle}
        />
      </figure>
      <article className='w-1/2 h-full'>
        <BookReviewDisplay
          mode='view'
          previewData={reviewData}
        />
      </article>
    </section>
  );
};

export default BookViewerPage;
