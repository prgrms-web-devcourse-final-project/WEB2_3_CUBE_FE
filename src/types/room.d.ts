interface Furniture {
  furnitureType: string;
  isVisible: boolean;
  level: number;
  maxCapacity: number;
}
interface StorageData {
  maxMusic: number;
  savedMusic: number;
  writtenMusicLogs: number;
  maxBooks: number;
  savedBooks: number;
  writtenReviews: number;
}

interface RoomData {
  roomId: number;
  nickname: string;
  userId: number;
  theme: string;
  createdAt: string;
  furnitures: Furniture[];
  storageLimits: StorageLimits;
  userStorage: UserStorage;
}

interface DockMenuProps {
  activeSettings: string;
  onSettingsChange: (setting: 'preference' | 'theme' | null) => void;
  resetState: boolean;
}
