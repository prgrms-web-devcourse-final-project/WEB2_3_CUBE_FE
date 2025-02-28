import { BOOK_THEME, BookThemeType } from '@/constants/bookTheme';
import CheckIcon from './BookThemeCheckIcon';

interface ThemeSelectorProps {
  selectedTheme: BookThemeType;
  onThemeChange: (theme: BookThemeType) => void;
}

const ThemeSelector = ({
  selectedTheme,
  onThemeChange,
}: ThemeSelectorProps) => {
  const themes: { type: BookThemeType; ringColor: string }[] = [
    { type: 'BLUE', ringColor: '#3E507D' },
    { type: 'RED', ringColor: '#7D3E59' },
    { type: 'GREEN', ringColor: '#567D3E' },
  ];

  return (
    <div className='flex gap-4'>
      {themes.map(({ type, ringColor }) => (
        <button
          key={type}
          onClick={() => onThemeChange(type)}
          className='relative w-8 h-8 transition-all rounded-full cursor-pointer'
          style={{
            backgroundColor: BOOK_THEME[type].surface,
            boxShadow: `0 0 0 2px ${ringColor}b3`,
          }}>
          {selectedTheme === type && (
            <CheckIcon
              color={BOOK_THEME[type].primary}
              className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
