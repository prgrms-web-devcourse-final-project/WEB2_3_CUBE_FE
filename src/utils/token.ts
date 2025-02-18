const TOKEN_KEY = 'accessToken';
const USER_KEY = 'user';

export const tokenService = {
  // 토큰 저장
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // 토큰 가져오기
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // 토큰 삭제
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // 유저 정보 저장
  setUser: (user: any) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  // 유저 정보 가져오기
  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // 유저 정보 삭제
  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },

  // 로그아웃
  clearAll: () => {
    localStorage.clear();
  },
};
