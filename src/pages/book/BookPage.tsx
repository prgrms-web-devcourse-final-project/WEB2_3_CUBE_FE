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
  const [bookInfo, setBookInfo] = useState<{
    title: string;
    author: string;
    genreNames: string[];
    publishedDate: string;
    imageUrl: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!bookId) return;

        const bookDetail = await bookAPI.getBookDetail(bookId);
        setBookInfo({
          title: bookDetail.title,
          author: bookDetail.author,
          genreNames: bookDetail.genreNames,
          publishedDate: bookDetail.publishedDate,
          imageUrl: bookDetail.imageUrl,
        });

        const review = await bookAPI.getReview(bookId);
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
        console.error('데이터 조회 중 오류 발생:', error);
        setHasReview(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [bookId]);

  if (isLoading || !bookInfo) return <div>로딩 중...</div>;

  return (
    <>
      {hasReview ? (
        <BookReviewViewer reviewData={reviewData} />
      ) : (
        <BookReviewEditor
          bookTitle={bookInfo.title}
          author={bookInfo.author}
          genres={bookInfo.genreNames}
          publishedDate={bookInfo.publishedDate}
          imageUrl={bookInfo.imageUrl}
        />
      )}
    </>
  );
};

export default BookPage;
