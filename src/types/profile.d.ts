interface UserProfile {
  id: string;
  userId: string;
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
  recommendedUsers: RecommendedUser[];
  myProfile: boolean;
  isMatched: boolean;
}

interface ProfileSectionProps {
  profile: Pick<UserProfileResponse, 'nickname' | 'profileImage' | 'bio'>;
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
  onProfileUpdate?: () => void;
}

interface UpdateProfileRequest {
  nickname?: string;
  bio?: string;
  musicGenres?: string[];
  bookGenres?: string[];
}
