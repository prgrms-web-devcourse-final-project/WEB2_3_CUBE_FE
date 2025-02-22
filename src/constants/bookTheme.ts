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
    surface: '#F1D1D1',
  },
  GREEN: {
    primary: '#375612', // title-color
    secondary: '#567D3E', // border, placeholder
    background: '#FBFCF7', // background-color
    surface: '#E8F1D1', // textarea-background
  },
} as const;

export type BookThemeType = keyof typeof BOOK_THEME;