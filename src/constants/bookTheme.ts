export const BOOK_THEME = {
  BLUE: {
    primary: '#162C63',
    secondary: '#3E507D',
    background: '#F7F8FC',
    surface: '#D1E5F1',
  },
  RED: {
    primary: '#521630',
    secondary: '#7D3E59',
    background: '#FFF7F7',
    surface: '#FFE5E5',
  },
  GREEN: {
    primary: '#375612',
    secondary: '#45A972',
    background: '#FBFCF7',
    surface: '#E5FFE9',
  },
} as const;

export type BookThemeType = keyof typeof BOOK_THEME;
