import { useState } from 'react';

const BUTTON_THEMES = {
  red: {
    background: '#DF4F92',
    border: '#A51C5C',
    shadow: '#CE317A',
  },
  gray: {
    background: '#B2B2B2',
    border: '#575757',
    shadow: '#838383',
  },
  blue: {
    background: '#73A1F7',
    border: '#2656CD',
    shadow: '#477DE1',
  },
  purple: {
    background: '#C46BE2',
    border: '#6C1B87',
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
    <button
      className={`
        relative 
        px-6 py-3 
        rounded-lg 
        transition-all 
        duration-100 
        font-bold text-white
        ${className}
      `}
      style={{
        backgroundColor: colorTheme.background,
        border: `1px solid ${colorTheme.border}`,
        boxShadow: isPressed
          ? `0 4px 0 ${colorTheme.shadow}`
          : `0 8px 0 ${colorTheme.shadow}`,
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
  );
};

export default LayeredButton;
