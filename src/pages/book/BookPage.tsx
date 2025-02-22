import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookReviewEditor from '../book-editor/BookEditorPage';
import BookReviewViewer from '../book-viewer/BookViewerPage';
import { bookAPI } from '@/apis/book';
import type { ReviewData } from '@/types/review';
import { useToastStore } from '@/store/useToastStore';

const BookPage = () => {
  const { bookId, userId } = useParams();
  const [searchParams] = useSearchParams();
  const showToast = useToastStore((state) => state.showToast);
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

  const isEditMode = searchParams.get('mode') === 'edit';
  const isMyReview = !userId; // URL에 userId가 없으면 내 서평

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
        showToast('데이터 조회에 실패했습니다.', 'error');
        setHasReview(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [bookId]);

  if (isLoading || !bookInfo) return <div>로딩 중...</div>;

  // 다른 유저의 서평이면서 수정 모드인 경우 접근 불가
  if (!isMyReview && isEditMode) {
    return <div>접근할 수 없는 페이지입니다.</div>;
  }

  // 내 서평이면서 수정 모드이거나 서평이 없는 경우 에디터 표시
  if ((isMyReview && isEditMode) || !hasReview) {
    return (
      <BookReviewEditor
        bookTitle={bookInfo.title}
        author={bookInfo.author}
        genres={bookInfo.genreNames}
        publishedDate={bookInfo.publishedDate}
        imageUrl={bookInfo.imageUrl}
      />
    );
  }

  // 그 외의 경우 뷰어 표시
  return <BookReviewViewer reviewData={reviewData} />;
};

export default BookPage;
