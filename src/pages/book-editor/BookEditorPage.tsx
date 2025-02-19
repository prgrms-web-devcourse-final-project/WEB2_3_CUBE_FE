import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import ReviewTextField from './components/ReviewTextField';
import FreeformEditor from './components/FreeformEditor';
import BookReviewDisplay from '@pages/book-viewer/components/BookReviewDisplay';
import { mockBooks } from '@/mocks/searchData';
import { BOOK_THEME, BookThemeType } from '@/constants/bookTheme';
import CheckIcon from './components/CheckIcon';

interface ReviewFields {
  // 도서 정보 (API로 받아올 정보)
  bookTitle: string;
  author: string;
  genres: string[];
  publishedDate: string;
  // 리뷰 정보 (사용자 입력)
  title: string;
  reviewDate: string;
  theme: BookThemeType;
  quote: string;
  emotion: string;
  reason: string;
  discussion: string;
  freeform: string;
}

const BookEditorPage = () => {
  const [reviewFields, setReviewFields] = useState<ReviewFields>({
    // 도서 정보 -> 임시로 mock 데이터 사용, 나중에 수정하기!
    bookTitle: mockBooks[0].title,
    author: mockBooks[0].author,
    genres: mockBooks[0].genres,
    publishedDate: mockBooks[0].publishedDate,
    // 리뷰 정보
    title: '',
    reviewDate: new Date().toISOString().split('T')[0],
    theme: 'BLUE',
    quote: '',
    emotion: '',
    reason: '',
    discussion: '',
    freeform: '',
  });

  const handleFieldChange =
    (field: keyof ReviewFields) => (value: string | BookThemeType) => {
      setReviewFields((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const isValidReview = () => {
    // 최소 1개 이상의 필드가 입력되었는지 확인
    return Object.values(reviewFields).some((value) => value.trim() !== '');
  };

  const handleSave = () => {
    // 저장 로직 구현
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
    <section className='w-full h-screen item-between'>
      {/* 에디터 영역 */}
      <article className='flex flex-col w-1/2 h-screen bg-white'>
        <div className='flex flex-col gap-8 py-12 overflow-auto px-14 '>
          {/* 제목 입력 영역 */}
          <input
            type='text'
            placeholder='제목을 입력해주세요...'
            value={reviewFields.title}
            onChange={(e) => handleFieldChange('title')(e.target.value)}
            className={`w-full p-4 text-4xl font-semibold focus:outline-none placeholder:text-opacity-40`}
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
                  className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
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
                  className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
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
                  className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
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

            <div className='flex justify-end gap-2'>
              <button className='px-4 py-2 text-gray-600 bg-gray-200 rounded-md'>
                임시저장
              </button>
              <button
                disabled={!isValidReview()}
                onClick={handleSave}
                className='px-4 py-2 text-white bg-blue-600 rounded-md disabled:bg-gray-400'>
                저장하기
              </button>
            </div>
          </div>

          {/* 에디터 본문 */}
          <div className='flex-1 overflow-auto'>
            <EditorContent editor={editor} />
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
