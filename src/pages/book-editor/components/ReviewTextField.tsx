import { BookThemeType, BOOK_THEME } from '@/constants/bookTheme';
import { useEffect, useRef } from 'react';

interface ReviewTextFieldProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  theme?: BookThemeType;
}

const ReviewTextField = ({
  title,
  value,
  onChange,
  placeholder = '내용을 입력해주세요.\n빈 칸으로 저장하면 해당 필드는 표시되지 않습니다.',
  theme = 'BLUE',
}: ReviewTextFieldProps) => {
  const colors = BOOK_THEME[theme];
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 텍스트 입력시 높이 자동 조절
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <div>
      <style>
        {`
          .themed-textarea::placeholder {
            color: ${colors.secondary}60;
          }
        `}
      </style>
      <h2
        className='mb-2 text-lg font-semibold'
        style={{ color: colors.primary }}>
        {title}
      </h2>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          adjustHeight();
        }}
        placeholder={placeholder}
        className='w-full min-h-[96px] p-4 rounded-lg resize-none focus:outline-none themed-textarea scrollbar-hide'
        style={{
          backgroundColor: `${colors.background}60`,
          borderWidth: '2px',
          borderColor: `${colors.secondary}50`,
          color: colors.secondary,
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      />
    </div>
  );
};

export default ReviewTextField;
