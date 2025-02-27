interface UserProfile {
  id: string;
  nickname: string;
  profileImage: string;
  bio: string;
  musicGenres: string[];
  bookGenres: string[];
  myProfile: boolean;
  isMatched: boolean;
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
  isMatched: boolean;
}

interface RecommendedUserResponse {
  userId: string;
  nickname: string;
  profileImage: string;
}

interface UserProfile {
  userId: string;
  nickname: string;
  profileImage: string;
  bio: string;
  musicGenres: string[];
  bookGenres: string[];
  isMatched?: boolean;
}

interface RecommendedUser {
  userId: string;
  nickname: string;
  profileImage: string;
}

interface ProfileSectionProps {
  profile: Pick<UserProfile, 'nickname' | 'profileImage' | 'bio'>;
}

interface GenreCardProps {
  title: string;
  genres: string[];
}

interface RecommendedUserListProps {
  users: RecommendedUser[];
}

interface ProfileButtonsProps {
  userId: string;
  isMyProfile: boolean;
  isMatched?: boolean;
  onProfileUpdate?: () => void;
}
