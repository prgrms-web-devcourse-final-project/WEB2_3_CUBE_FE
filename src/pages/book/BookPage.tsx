import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookReviewEditor from './components/BookReviewEditor';
import BookReviewViewer from './components/BookReviewViewer';

const BookPage = () => {
  const { bookId, userId } = useParams();
  const [hasReview, setHasReview] = useState(false);

  return <>{hasReview ? <BookReviewViewer /> : <BookReviewEditor />}</>;
};

export default BookPage;
