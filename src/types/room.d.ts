interface Furniture {
  furnitureType: string;
  isVisible: boolean;
  level: number;
  maxCapacity: number;
}

interface StorageLimits {
  maxMusic: number;
  maxBooks: number;
}

interface UserStorage {
  savedMusic: number;
  savedBooks: number;
  writtenReviews: number;
  writtenMusicLogs: number;
}

interface RoomData {
  roomId: number;
  userId: number;
  theme: string;
  createdAt: string;
  furnitures: Furniture[];
  storageLimits: StorageLimits;
  userStorage: UserStorage;
}
