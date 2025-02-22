import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookReviewEditor from '../book-editor/BookEditorPage';
import BookReviewViewer from '../book-viewer/BookViewerPage';

const BookPage = () => {
  const { bookId, userId } = useParams();
  const [hasReview, setHasReview] = useState(true);

  return <>{hasReview ? <BookReviewViewer /> : <BookReviewEditor />}</>;
};

export default BookPage;
