import { useState, useCallback } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { profileAPI } from '@/apis/profile';

export const useUserProfile = (targetUserId?: string) => {
  const { user } = useUserStore();
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);

  const updateProfile = useCallback(async () => {
    if (!targetUserId && !user?.userId) return;

    try {
      const userId = targetUserId || String(user?.userId);
      const data = await profileAPI.getUserProfile(userId);
      setProfile(data);
    } catch (error) {
      console.error('프로필 정보 조회 실패:', error);
    }
  }, [targetUserId, user?.userId]);

  return {
    profile,
    updateProfile,
  };
};
