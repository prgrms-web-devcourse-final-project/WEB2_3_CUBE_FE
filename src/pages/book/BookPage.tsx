import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookReviewEditor from '../book-editor/BookEditorPage';
import BookReviewViewer from '../book-viewer/BookViewerPage';
import { bookAPI } from '@/apis/book';
import { useToastStore } from '@/store/useToastStore';
import { BookReviewData } from '@/types/book';

const BookPage = () => {
  const { bookId, userId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);
  const [hasReview, setHasReview] = useState(false);
  const [reviewData, setReviewData] = useState<BookReviewData | null>(null);
  const [bookInfo, setBookInfo] = useState<{
    title: string;
    author: string;
    genreNames: string[];
    publishedDate: string;
    imageUrl: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isEditMode = searchParams.get('mode') === 'edit';
  // URL에 userId가 있으면 다른 사람의 서평
  const isMyReview = !userId;

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
            genreNames: bookDetail.genreNames,
            publishedDate: bookDetail.publishedDate,
            imageUrl: bookDetail.imageUrl,
            title: review.title,
            writeDateTime: review.writeDateTime,
            theme: review.coverColor,
            quote: review.quote,
            emotion: review.takeaway,
            reason: review.motivate,
            discussion: review.topic,
            freeform: review.freeFormText,
          });
          setHasReview(true);
        } else {
          setHasReview(false);
          // URL에 userId가 없고(내 서평이고) 작성 페이지가 아닌 경우에만 리다이렉트
          if (!userId && !isEditMode) {
            showToast('조회된 서평이 없어 작성 페이지로 이동합니다.', 'info');
            navigate(`/book/${bookId}?mode=edit`, { replace: true });
            return;
          }
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
  }, [bookId, isMyReview, isEditMode, navigate, showToast]);

  if (isLoading || !bookInfo) return <div>로딩 중...</div>;

  // 다른 유저의 서평이면서 수정 모드인 경우 접근 불가
  if (!isMyReview && isEditMode) {
    return <div>접근할 수 없는 페이지입니다.</div>;
  }

  // 내 서평이고 수정 모드이거나, 서평이 없는 경우 에디터 표시
  if ((isMyReview && isEditMode) || (isMyReview && !hasReview)) {
    return (
      <BookReviewEditor
        bookTitle={bookInfo.title}
        author={bookInfo.author}
        genreNames={bookInfo.genreNames}
        publishedDate={bookInfo.publishedDate}
        imageUrl={bookInfo.imageUrl}
      />
    );
  }

  // 서평이 있는 경우에만 뷰어 표시
  if (hasReview && reviewData) {
    return (
      <BookReviewViewer
        reviewData={reviewData}
        bookId={bookId}
      />
    );
  }

  // 다른 사람의 서평인데 서평이 없는 경우
  return <div>존재하지 않는 서평입니다.</div>;
};

export default BookPage;
