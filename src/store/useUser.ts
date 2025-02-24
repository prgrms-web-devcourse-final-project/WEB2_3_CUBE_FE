import { create } from 'zustand';

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

export const useUserStore = create<UserStore>((set) => {
  return {
    user: null,

    setUser: (user) => {
      return set({ user: user });
    },
  };
});
