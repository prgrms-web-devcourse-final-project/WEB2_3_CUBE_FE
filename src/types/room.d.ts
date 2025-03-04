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
  topBookGenres: string[];
  topCdGenres: string[];
}

interface DockMenuProps {
  activeSettings: string;
  onSettingsChange: (setting: 'preference' | 'theme' | null) => void;
  resetState: boolean;
}

interface Housemate {
  userId: number;
  nickname: string;
  profileImage?: string;
  bio?: string;
  status: 'ONLINE' | 'OFFLINE';
}

interface Room {
  roomId: string;
  userId: number;
  nickname: string;
  theme: keyof typeof themeData;
  modelPath?: string;
  furnitures?: { furnitureType: FurnitureType; isVisible: boolean }[];
}
interface HiveRoomModelProps {
  room: Room;
  position: [number, number, number];
}

interface HiveRoomsProps {
  myUserId: number;
}