import { useState, useEffect, useMemo } from 'react';
import { profileAPI } from '@apis/profile';
import { housemateAPI } from '@apis/housemate';
import { useUserStore } from '@/store/useUserStore';

interface UseProfileDataReturn {
  userProfile: UserProfile | null;
  recommendedUsers: RecommendedUser[];
  isLoading: boolean;
  isMyProfile: boolean;
  handleProfileUpdate: () => Promise<void>;
}

export const useProfileData = (
  userId: string | undefined,
): UseProfileDataReturn => {
  const { user } = useUserStore();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendedUsers, setRecommendedUsers] = useState<RecommendedUser[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  const isMyProfile = useMemo(
    () => userId === String(user?.userId),
    [userId, user?.userId],
  );

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      if (!userId) return;

      const [profile, recommendations] = await Promise.all([
        profileAPI.getUserProfile(userId),
        profileAPI.getRecommendedUsers(userId),
      ]);

      let isMatched = false;
      if (!isMyProfile) {
        const following = await housemateAPI.getFollowing(
          undefined,
          undefined,
          profile.nickname,
        );
        isMatched = following.length > 0;
      }

      const userProfileData: UserProfile = {
        ...profile,
        userId: profile.id,
        isMatched,
      };

      setUserProfile(userProfileData);
      setRecommendedUsers(recommendations);
    } catch (error) {
      console.error('프로필 데이터 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (!userId) return;
    await fetchProfileData();
  };

  useEffect(() => {
    fetchProfileData();
  }, [userId, user?.userId]);

  return {
    userProfile,
    recommendedUsers,
    isLoading,
    isMyProfile,
    handleProfileUpdate,
  };
};
