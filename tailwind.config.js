/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Helvetica',
          '"Apple Color Emoji"',
          'Arial',
          'sans-serif',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Sans KR"',
          '"Apple SD Gothic Neo"',
          '"맑은 고딕"',
          '"Malgun Gothic"',
        ],
      },
      backgroundImage: {
        'book-gradient': 'linear-gradient(180deg, #73A1F7 0%, #4983EF 100%)', // 책 파랑
        'modal': 'inset 0px 0px 40px 10px rgba(152, 200, 228, 0.30), drop-shadow(0px 10px 20px rgba(62, 80, 125, 0.20))', // 모달
      },
      boxShadow : {
        'book-shadow': 'drop-shadow(10px 4px 10px rgba(78, 122, 207, 0.15))', // 책 그림자
        'logo-shadow': 'drop-shadow(0px 4px 4px rgba(78, 122, 207, 0.15))', // 로고 그림자
        'modal-shadow': 'drop-shadow(0px 10px 10px rgba(38, 86, 205, 0.30))', // 모달창 그림자

      }
    },
  },
  plugins: [],
};
