import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface User {
  email: string;
  nickname: string;
  profileImage: string;
  roomId: number;
  userId: number;
}
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user: user }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
