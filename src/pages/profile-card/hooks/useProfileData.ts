import { useState, useEffect, useMemo } from 'react';
import { profileAPI } from '@apis/profile';
import { housemateAPI } from '@apis/housemate';
import { useUserStore } from '@/store/useUserStore';

interface UseProfileDataReturn {
  userProfile: UserProfile | null;
  isLoading: boolean;
  isMyProfile: boolean;
  handleProfileUpdate: () => Promise<void>;
}

export const useProfileData = (
  userId: string | undefined,
): UseProfileDataReturn => {
  const { user } = useUserStore();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      if (!userId) return;

      const [profile] = await Promise.all([profileAPI.getUserProfile(userId)]);

      const userProfileData: UserProfile = {
        ...profile,
        userId: profile.id,
        isFollowing: profile.following,
      };

      setUserProfile(userProfileData);
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
    isLoading,
    isMyProfile: userProfile?.myProfile ?? false,
    handleProfileUpdate,
  };
};
