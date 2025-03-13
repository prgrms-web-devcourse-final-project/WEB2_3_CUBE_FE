import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import { useEffect } from 'react';
import { BookThemeType, BOOK_THEME } from '@/constants/bookTheme';

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
      StarterKit.configure({
        heading: false,
        blockquote: false,
      }),
      TextAlign.configure({
        types: ['paragraph'],
      }),
      Underline,
      Strike,
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

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return (
    <div>
      <h3
        className='mb-2 text-lg font-semibold'
        style={{ color: colors.primary }}>
        자유 형식
      </h3>
      {/* 메뉴 바 */}
      <div
        className='flex gap-2 items-center p-2 text-gray-500 rounded-t-lg'
        style={{
          borderWidth: '2px',
          borderColor: `${colors.secondary}33`,
          backgroundColor: `${colors.background}60`,
        }}>
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`w-10 h-10 hover:bg-gray-100/50 rounded ${
            editor?.isActive('bold') ? 'bg-gray-200/50' : ''
          }`}>
          <span className='font-bold'>B</span>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`w-10 h-10 hover:bg-gray-100/50 rounded ${
            editor?.isActive('italic') ? 'bg-gray-200/50' : ''
          }`}>
          <span className='italic'>I</span>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`w-10 h-10 hover:bg-gray-100/50 rounded ${
            editor?.isActive('underline') ? 'bg-gray-200/50' : ''
          }`}>
          <span className='underline'>U</span>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={`w-10 h-10 hover:bg-gray-100/50 rounded ${
            editor?.isActive('strike') ? 'bg-gray-200/50' : ''
          }`}>
          <span className='line-through'>S</span>
        </button>
      </div>
      {/* 에디터 본문 */}
      <div
        className='p-4 rounded-b-md'
        style={{
          borderWidth: '2px',
          borderTopWidth: 0,
          borderColor: `${colors.secondary}30`,
          backgroundColor: `${colors.background}60`,
          color: colors.secondary,
        }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default FreeformEditor;
