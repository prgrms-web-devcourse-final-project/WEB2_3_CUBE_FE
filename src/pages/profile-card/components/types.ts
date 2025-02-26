export interface UserProfile {
  id: string;
  nickname: string;
  profileImage: string;
  bio: string;
  musicGenres: string[];
  bookGenres: string[];
  myProfile: boolean;
}

export interface RecommendedUser {
  userId: string;
  nickname: string;
  profileImage: string;
}

export interface GenreCardProps {
  title: '음악 감성' | '독서 취향';
  genres: string[];
}

export interface ProfileButtonsProps {
  isMyProfile: boolean;
  onMateButtonClick: () => void;
  onRoomButtonClick: () => void;
}
