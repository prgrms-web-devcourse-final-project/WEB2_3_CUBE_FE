import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileAPI, UpdateProfileRequest } from '@/apis/profile';

export const useProfileEdit = (userId: string) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (file: File) => {
    try {
      const { presignedUrl, imageUrl } = await profileAPI.updateProfileImage(file);

      await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      return imageUrl;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      throw error;
    }
  };

  const updateProfile = async (data: UpdateProfileRequest) => {
    try {
      setIsLoading(true);

      // 이미지가 File 객체인 경우 S3에 업로드
      if (data.profileImage instanceof File) {
        const imageUrl = await handleImageUpload(data.profileImage);
        data.profileImage = imageUrl;
      }

      await profileAPI.updateProfile(userId, data);
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error('프로필 수정 실패:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    isLoading,
  };
};
