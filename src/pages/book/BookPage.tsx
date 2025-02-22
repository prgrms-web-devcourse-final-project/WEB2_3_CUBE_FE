import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookReviewEditor from '../book-editor/BookEditorPage';
import BookReviewViewer from '../book-viewer/BookViewerPage';
import { bookAPI } from '@/apis/book';
import type { ReviewData } from '@/types/review';

const BookPage = () => {
  const { bookId } = useParams();
  const [hasReview, setHasReview] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        if (!bookId) return;

        const review = await bookAPI.getReview(bookId);
        const bookDetail = await bookAPI.getBookDetail(bookId);

        if (review) {
          setReviewData({
            bookTitle: bookDetail.title,
            author: bookDetail.author,
            genres: bookDetail.genreNames,
            publishedDate: bookDetail.publishedDate,
            imageUrl: bookDetail.imageUrl,
            title: review.title,
            reviewDate: new Date().toLocaleDateString('ko-KR'),
            theme: review.coverColor,
            quote: review.quote,
            emotion: review.takeaway,
            reason: review.motive,
            discussion: review.topic,
            freeform: review.freeFormText,
          });
          setHasReview(true);
        } else {
          setHasReview(false);
        }
      } catch (error) {
        console.error('서평 조회 중 오류 발생:', error);
        setHasReview(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReview();
  }, [bookId]);

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <>
      {hasReview ? (
        <BookReviewViewer reviewData={reviewData} />
      ) : (
        <BookReviewEditor />
      )}
    </>
  );
};

export default BookPage;
