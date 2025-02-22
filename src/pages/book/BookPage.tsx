import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookReviewEditor from '../book-editor/BookEditorPage';
import BookReviewViewer from '../book-viewer/BookViewerPage';
import { bookAPI } from '@/apis/book';

const BookPage = () => {
  const { bookId } = useParams();
  const [hasReview, setHasReview] = useState(false);

  useEffect(() => {
    const checkReview = async () => {
      try {
        if (!bookId) return;

        const review = await bookAPI.getReview(bookId);
        setHasReview(!!review); // review가 있으면 true, 없으면 false
      } catch (error) {
        console.error('서평 조회 중 오류 발생:', error);
        setHasReview(false);
      }
    };

    checkReview();
  }, [bookId]);

  return <>{hasReview ? <BookReviewViewer /> : <BookReviewEditor />}</>;
};

export default BookPage;
