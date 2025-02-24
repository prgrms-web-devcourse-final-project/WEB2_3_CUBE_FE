import { useState } from 'react';

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
    <button
      className={`relative px-6 py-3 font-bold text-white rounded-lg transition-all duration-100 ${className}`}
      style={{
        backgroundColor: colorTheme.backgroundColor,
        border: `1px solid ${colorTheme.borderColor}`,
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
