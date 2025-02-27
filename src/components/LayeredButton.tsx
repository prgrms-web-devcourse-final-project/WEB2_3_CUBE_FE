import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const BUTTON_THEMES = {
  red: {
    backgroundColor: '#DF4F92',
    borderColor: '#A51C5C',
    shadow: '#CE317A',
  },
  gray: {
    backgroundColor: '#B2B2B2',
    borderColor: '#575757',
    shadow: '#838383',
  },
  blue: {
    backgroundColor: '#73A1F7',
    borderColor: '#2656CD',
    shadow: '#477DE1',
  },
  purple: {
    backgroundColor: '#C46BE2',
    borderColor: '#6C1B87',
    shadow: '#A84CC7',
  },
};

const LayeredButton = ({
  children,
  theme = 'red',
  className = '',
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const colorTheme = BUTTON_THEMES[theme];

  return (
    <div className='relative'>
      {/* 그림자 레이어 */}
      <div
        className='absolute w-full h-full rounded-lg'
        style={{
          backgroundColor: colorTheme.shadow,
          border: `2px solid ${colorTheme.borderColor}`,
          top: '8px',
        }}
      />
      {/* 버튼 */}
      <button
        className={twMerge(
          'relative w-full font-bold text-white rounded-lg transition-all duration-100 px-6 py-3',
          className,
        )}
        style={{
          backgroundColor: colorTheme.backgroundColor,
          border: `2px solid ${colorTheme.borderColor}`,
          transform: isPressed ? 'translateY(4px)' : 'translateY(0)',
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        {...props}>
        <span>{children}</span>
      </button>
    </div>
  );
};

export default LayeredButton;
