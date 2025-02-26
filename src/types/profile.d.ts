interface UserProfile {
  id: string;
  nickname: string;
  profileImage: string;
  bio: string;
  musicGenres: string[];
  bookGenres: string[];
  myProfile: boolean;
}

interface RecommendedUser {
  userId: string;
  nickname: string;
  profileImage: string;
}

interface GenreCardProps {
  title: '음악 감성' | '독서 취향';
  genres: string[];
}

interface ProfileButtonsProps {
  isMyProfile: boolean;
  onMateButtonClick: () => void;
  onRoomButtonClick: () => void;
}

interface UserProfileResponse {
  id: string;
  nickname: string;
  profileImage: string;
  bio: string;
  musicGenres: string[];
  bookGenres: string[];
  myProfile: boolean;
}

interface RecommendedUserResponse {
  userId: string;
  nickname: string;
  profileImage: string;
}
