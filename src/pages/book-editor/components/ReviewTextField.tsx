import { BookThemeType, BOOK_THEME } from '@/constants/bookTheme';

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

  return (
    <div>
      <h2
        className='mb-2 text-lg font-semibold'
        style={{ color: colors.primary }}>
        {title}
      </h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='w-full h-24 p-4 rounded-lg resize-none focus:outline-none'
        style={{
          backgroundColor: colors.background,
          borderWidth: '2px',
          borderColor: `${colors.secondary}30`,
          color: colors.secondary,
        }}
      />
    </div>
  );
};

export default ReviewTextField;
