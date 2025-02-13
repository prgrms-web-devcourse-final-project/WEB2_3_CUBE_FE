import { create } from "zustand";
interface LoginState {
  accessToken: string | null;
  isLoggedIn: boolean;

  login: (accessToken: string | null) => void;
  logout: () => void;
}
export const useLoginStore = create<LoginState>((set) => ({
  accessToken: null,
  isLoggedIn: false,

  login: (accessToken: string | null) => set({ isLoggedIn: true, accessToken: accessToken }),
  logout: () => set({ isLoggedIn: false, accessToken: null }),
}));
