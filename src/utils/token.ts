const TOKEN_KEY = "accessToken";
const USER_KEY = "user";

export const tokenService = {
  // 토큰 저장
  setToken: (token: string) => {
    sessionStorage.setItem(TOKEN_KEY, token);
  },

  // 토큰 가져오기
  getToken: () => {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  // 토큰 삭제
  removeToken: () => {
    sessionStorage.removeItem(TOKEN_KEY);
  },

  // 유저 정보 저장
  setUser: (user: any) => {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  // 유저 정보 가져오기
  getUser: () => {
    const user = sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // 유저 정보 삭제
  removeUser: () => {
    sessionStorage.removeItem(USER_KEY);
  },

  // 로그아웃
  clearAll: () => {
    sessionStorage.clear();
  },
};
