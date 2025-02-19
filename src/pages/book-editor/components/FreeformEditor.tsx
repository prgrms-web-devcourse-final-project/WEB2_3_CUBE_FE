import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import Strike from '@tiptap/extension-strike';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { BookThemeType, BOOK_THEME } from '@/constants/bookTheme';

type Level = 2 | 3 | 4 | 5; // 2-5 레벨 허용

interface FreeformEditorProps {
  value: string;
  onChange: (value: string) => void;
  theme?: BookThemeType;
}

const FreeformEditor = ({
  value,
  onChange,
  theme = 'BLUE',
}: FreeformEditorProps) => {
  const colors = BOOK_THEME[theme];

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Heading.configure({
        levels: [2, 3, 4, 5] as Level[],
      }),
      Strike,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-blue-600 hover:underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-lg',
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[200px] p-2',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const headingLevels: Level[] = [2, 3, 4, 5]; // 2-5 레벨 배열

  const addLink = () => {
    const url = window.prompt('URL을 입력해주세요:');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('이미지 URL을 입력해주세요:');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div>
      <h3
        className='mb-2 text-lg font-semibold'
        style={{ color: colors.primary }}>
        자유 형식
      </h3>
      {/* 메뉴 바 */}
      <div
        className='flex items-center gap-2 p-2 rounded-t-lg'
        style={{
          borderWidth: '2px',
          borderColor: `${colors.secondary}33`,
          backgroundColor: `${colors.background}60`,
        }}>
        {headingLevels.map((level) => (
          <button
            key={level}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level }).run()
            }
            className={`p-2 hover:bg-gray-100 rounded ${
              editor?.isActive('heading', { level }) ? 'bg-gray-200' : ''
            }`}>
            <span className='font-bold'>H{level}</span>
          </button>
        ))}
        <div className='w-px h-6 mx-2 bg-gray-300' /> {/* 구분선 */}
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-2 hover:bg-gray-100 rounded ${
            editor?.isActive('bold') ? 'bg-gray-200' : ''
          }`}>
          <span className='font-bold'>B</span>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-2 hover:bg-gray-100 rounded ${
            editor?.isActive('italic') ? 'bg-gray-200' : ''
          }`}>
          <span className='italic'>I</span>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`p-2 hover:bg-gray-100 rounded ${
            editor?.isActive('underline') ? 'bg-gray-200' : ''
          }`}>
          <span className='underline'>U</span>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={`p-2 hover:bg-gray-100 rounded ${
            editor?.isActive('strike') ? 'bg-gray-200' : ''
          }`}>
          <span className='line-through'>S</span>
        </button>
        <div className='w-px h-6 mx-2 bg-gray-300' />
        <button
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={`p-2 hover:bg-gray-100 rounded ${
            editor?.isActive('blockquote') ? 'bg-gray-200' : ''
          }`}>
          <span className='font-serif'>"</span>
        </button>
        <button
          onClick={addLink}
          className={`p-2 hover:bg-gray-100 rounded ${
            editor?.isActive('link') ? 'bg-gray-200' : ''
          }`}>
          <span>🔗</span>
        </button>
        <button
          onClick={addImage}
          className='p-2 rounded hover:bg-gray-100'>
          <span>🖼️</span>
        </button>
      </div>
      {/* 에디터 본문 */}
      <div
        className='rounded-b-md p-4'
        style={{
          borderWidth: '2px',
          borderTopWidth: 0,
          borderColor: `${colors.secondary}30`,
          backgroundColor: `${colors.background}60`,
          color: colors.secondary
        }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default FreeformEditor;
