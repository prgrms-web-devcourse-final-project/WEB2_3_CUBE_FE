import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import ReviewTextField from './ReviewTextField';
import FreeformEditor from './FreeformEditor';

interface ReviewFields {
  quote: string;
  emotion: string;
  reason: string;
  discussion: string;
  freeform: string; // 자유 형식
}

const BookReviewEditor = () => {
  const [reviewFields, setReviewFields] = useState<ReviewFields>({
    quote: '',
    emotion: '',
    reason: '',
    discussion: '',
    freeform: '',
  });

  const handleFieldChange = (field: keyof ReviewFields) => (value: string) => {
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
      <article className='w-1/2 flex flex-col h-screen bg-white'>
        <div className='overflow-auto flex flex-col gap-8 py-12 px-14'>
          {/* 제목 입력 영역 */}
          <input
            type='text'
            placeholder='제목을 입력해주세요...'
            className='w-full text-4xl font-semibold focus:outline-none border-b-2 border-[#3E507D]/20 p-4 placeholder:text-[#162C63]/60 text-[#162C63]'
          />

          {/* 테마 선택 영역 */}
          <div className='flex gap-2'>
            <button className='w-8 h-8 rounded-full bg-blue-100 cursor-pointer'></button>
            <button className='w-8 h-8 rounded-full bg-red-100 cursor-pointer'></button>
            <button className='w-8 h-8 rounded-full bg-green-100 cursor-pointer'></button>
          </div>

          <div className='space-y-6'>
            <ReviewTextField
              title='인상 깊은 구절'
              value={reviewFields.quote}
              onChange={handleFieldChange('quote')}
              placeholder='인상 깊은 구절을 남겨주세요.'
            />

            <ReviewTextField
              title='그 때 나의 감정'
              value={reviewFields.emotion}
              onChange={handleFieldChange('emotion')}
              placeholder='그 때 나의 감정을 입력해주세요.'
            />

            <ReviewTextField
              title='책을 선택하게 된 계기'
              value={reviewFields.reason}
              onChange={handleFieldChange('reason')}
              placeholder='책을 선택하게 된 계기를 입력해주세요.'
            />

            <ReviewTextField
              title='다른 사람과 나누고 싶은 대화 주제'
              value={reviewFields.discussion}
              onChange={handleFieldChange('discussion')}
              placeholder='다른 사람과 나누고 싶은 대화 주제를 입력해주세요.'
            />

            <FreeformEditor
              value={reviewFields.freeform}
              onChange={handleFieldChange('freeform')}
            />

            <div className='flex gap-2 justify-end'>
              <button className='px-4 py-2 bg-gray-200 text-gray-600 rounded-md'>
                임시저장
              </button>
              <button
                disabled={!isValidReview()}
                onClick={handleSave}
                className='px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400'>
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
      <article className='w-1/2 h-full bg-blue-100 overflow-auto'></article>
    </section>
  );
};

export default BookReviewEditor;
