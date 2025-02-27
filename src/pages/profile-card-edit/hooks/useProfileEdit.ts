import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileAPI, UpdateProfileRequest } from '@/apis/profile';
import { useToastStore } from '@/store/useToastStore';

interface ProfileEditData extends UpdateProfileRequest {
  profileImage?: File | string;
}

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export const useProfileEdit = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();

  const validateImage = (file: File) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      throw new Error('PNG, JPG, JPEG 형식의 이미지만 업로드 가능합니다.');
    }
    if (file.size > MAX_IMAGE_SIZE) {
      throw new Error('이미지 크기는 4MB를 초과할 수 없습니다.');
    }
  };

  const updateProfile = async (data: ProfileEditData) => {
    try {
      setIsLoading(true);

      // 이미지가 File 객체인 경우 먼저 업로드
      if (data.profileImage instanceof File) {
        validateImage(data.profileImage);
        const { imageUrl } = await profileAPI.updateProfileImage(
          data.profileImage,
        );
        data.profileImage = imageUrl;
      }

      // 프로필 정보 업데이트
      const { nickname, bio, musicGenres, bookGenres } = data;
      await profileAPI.updateProfile({
        nickname,
        bio,
        musicGenres,
        bookGenres,
      });

      showToast('프로필이 성공적으로 수정되었습니다.', 'success');
      navigate(-1);
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      } else {
        showToast('프로필 수정에 실패했습니다.', 'error');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    isLoading,
    validateImage,
  };
};
