import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import ReviewTextField from './components/ReviewTextField';
import FreeformEditor from './components/FreeformEditor';
import BookReviewDisplay from '@pages/book-viewer/components/BookReviewDisplay';
import { BOOK_THEME, BookThemeType } from '@/constants/bookTheme';
import CheckIcon from './components/CheckIcon';
import { ReviewData } from '@/types/review';
import { useToastStore } from '@/store/useToastStore';
import { bookAPI } from '@/apis/book';

interface BookEditorPageProps {
  bookTitle?: string;
  author?: string;
  genreNames?: string[];
  publishedDate?: string;
  imageUrl?: string;
}

const BookEditorPage = ({
  bookTitle,
  author,
  genreNames,
  publishedDate,
  imageUrl,
}: BookEditorPageProps) => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showToast = useToastStore((state) => state.showToast);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(
    searchParams.get('mode') === 'edit',
  );
  const [reviewFields, setReviewFields] = useState<ReviewData>(() => {
    // localStorage에서 임시저장 데이터 불러오기
    const savedData = localStorage.getItem(`draft-review-${bookId}`);
    if (savedData) {
      return JSON.parse(savedData);
    }

    return {
      // 도서 정보
      bookTitle,
      author,
      genreNames,
      publishedDate,
      imageUrl,
      // 리뷰 정보
      title: '',
      reviewDate: new Date().toISOString().split('T')[0],
      theme: 'BLUE',
      quote: '',
      emotion: '',
      reason: '',
      discussion: '',
      freeform: '',
    };
  });

  // 자동 저장 함수
  const autoSave = useCallback(() => {
    if (!bookId) return;
    localStorage.setItem(
      `draft-review-${bookId}`,
      JSON.stringify(reviewFields),
    );
  }, [bookId, reviewFields]);

  // 수동 임시저장
  const handleTempSave = () => {
    autoSave();
    showToast('임시저장되었습니다.', 'success');
  };

  // 5초마다 자동저장
  useEffect(() => {
    const timer = setInterval(autoSave, 5000);
    return () => clearInterval(timer);
  }, [autoSave]);

  // 수정 모드일 때 기존 서평 데이터 불러오기
  useEffect(() => {
    const fetchReview = async () => {
      if (!bookId) return;

      try {
        const review = await bookAPI.getReview(bookId);
        if (review) {
          setIsEditMode(true);
          setReviewFields({
            bookTitle,
            author,
            genreNames,
            publishedDate,
            imageUrl,
            title: review.title,
            reviewDate: new Date().toLocaleDateString('ko-KR'),
            theme: review.coverColor,
            quote: review.quote,
            emotion: review.takeaway,
            reason: review.motivate,
            discussion: review.topic,
            freeform: review.freeFormText,
          });
        }
      } catch (error) {
        console.error('서평 조회 중 오류 발생:', error);
        showToast('서평 조회에 실패했습니다.', 'error');
      }
    };

    fetchReview();
  }, [bookId, bookTitle, author, genreNames, publishedDate, imageUrl]);

  const handleFieldChange =
    (field: keyof ReviewData) => (value: string | BookThemeType) => {
      setReviewFields((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const isValidReview = () => {
    // 최소 1개 이상의 필드가 입력되었는지 확인
    return Object.values(reviewFields).some((value) => value.trim() !== '');
  };

  const handleSave = async () => {
    if (!bookId || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const reviewData = {
        title: reviewFields.title,
        quote: reviewFields.quote,
        takeaway: reviewFields.emotion,
        motivate: reviewFields.reason,
        topic: reviewFields.discussion,
        freeFormText: reviewFields.freeform,
        coverColor: reviewFields.theme,
      };

      if (isEditMode) {
        await bookAPI.updateReview(bookId, reviewData);
        showToast('서평이 수정되었습니다.', 'success');
      } else {
        await bookAPI.addReview(bookId, reviewData);
        showToast('서평이 등록되었습니다.', 'success');
      }

      // 성공 시 임시저장 데이터 삭제
      localStorage.removeItem(`draft-review-${bookId}`);

      // 서평 상세 페이지로 이동
      navigate(`/book/${bookId}`);
    } catch (error) {
      console.error('서평 저장 중 오류 발생:', error);
      showToast('서평 저장에 실패했습니다.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[200px] px-4 py-2',
      },
    },
  });

  return (
    <section className='flex w-full h-screen'>
      {/* 에디터 영역 */}
      <article className='w-1/2 h-full p-8 overflow-auto'>
        <div className='flex flex-col gap-8 py-12 overflow-auto px-14 '>
          {/* 제목 입력 영역 */}
          <input
            type='text'
            placeholder='제목을 입력해주세요...'
            value={reviewFields.title}
            onChange={(e) => handleFieldChange('title')(e.target.value)}
            className={`w-full py-4 text-4xl font-semibold focus:outline-none placeholder:text-opacity-40`}
            style={{
              borderBottomWidth: '2px',
              borderBottomColor: `${
                BOOK_THEME[reviewFields.theme].secondary
              }33`,
              color: BOOK_THEME[reviewFields.theme].primary,
            }}
          />

          {/* 테마 선택 영역 */}
          <div className='flex gap-4'>
            <button
              onClick={() => handleFieldChange('theme')('BLUE')}
              className='w-8 h-8 rounded-full cursor-pointer transition-all relative ring-2 ring-[#3E507D]/70'
              style={{ backgroundColor: BOOK_THEME.BLUE.surface }}>
              {reviewFields.theme === 'BLUE' && (
                <CheckIcon
                  color={BOOK_THEME.BLUE.primary}
                  className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                />
              )}
            </button>
            <button
              onClick={() => handleFieldChange('theme')('RED')}
              className='w-8 h-8 rounded-full cursor-pointer transition-all relative ring-2 ring-[#7D3E59]/70'
              style={{ backgroundColor: BOOK_THEME.RED.surface }}>
              {reviewFields.theme === 'RED' && (
                <CheckIcon
                  color={BOOK_THEME.RED.primary}
                  className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                />
              )}
            </button>
            <button
              onClick={() => handleFieldChange('theme')('GREEN')}
              className='w-8 h-8 rounded-full cursor-pointer transition-all relative ring-2 ring-[#567D3E]/70'
              style={{ backgroundColor: BOOK_THEME.GREEN.surface }}>
              {reviewFields.theme === 'GREEN' && (
                <CheckIcon
                  color={BOOK_THEME.GREEN.primary}
                  className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                />
              )}
            </button>
          </div>

          <div className='space-y-6'>
            <ReviewTextField
              title='인상 깊은 구절'
              value={reviewFields.quote}
              onChange={handleFieldChange('quote')}
              placeholder='인상 깊은 구절을 남겨주세요.'
              theme={reviewFields.theme}
            />

            <ReviewTextField
              title='그 때 나의 감정'
              value={reviewFields.emotion}
              onChange={handleFieldChange('emotion')}
              placeholder='그 때 나의 감정을 입력해주세요.'
              theme={reviewFields.theme}
            />

            <ReviewTextField
              title='책을 선택하게 된 계기'
              value={reviewFields.reason}
              onChange={handleFieldChange('reason')}
              placeholder='책을 선택하게 된 계기를 입력해주세요.'
              theme={reviewFields.theme}
            />

            <ReviewTextField
              title='다른 사람과 나누고 싶은 대화 주제'
              value={reviewFields.discussion}
              onChange={handleFieldChange('discussion')}
              placeholder='다른 사람과 나누고 싶은 대화 주제를 입력해주세요.'
              theme={reviewFields.theme}
            />

            <FreeformEditor
              value={reviewFields.freeform}
              onChange={handleFieldChange('freeform')}
              theme={reviewFields.theme}
            />

            <div className='flex justify-end gap-4'>
              <button
                onClick={handleTempSave}
                className='px-4 py-2 text-gray-600 bg-gray-200 rounded-md drop-shadow-logo'>
                임시저장
              </button>
              <button
                disabled={!isValidReview() || isSubmitting}
                onClick={handleSave}
                className='px-4 py-2 text-white transition-colors rounded-md disabled:bg-gray-400 hover:opacity-80 active:bg-white drop-shadow-logo'
                style={{
                  backgroundColor:
                    !isValidReview() || isSubmitting
                      ? undefined
                      : BOOK_THEME[reviewFields.theme].primary,
                  color:
                    document.activeElement === document.querySelector(':active')
                      ? BOOK_THEME[reviewFields.theme].primary
                      : 'white',
                }}>
                {isSubmitting ? '저장 중...' : '저장하기'}
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* 실시간 뷰어 영역 */}
      <article className='w-1/2 h-full overflow-auto'>
        <BookReviewDisplay
          mode='preview'
          previewData={reviewFields}
        />
      </article>
    </section>
  );
};

export default BookEditorPage;
