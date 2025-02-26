import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { profileAPI } from '@apis/profile';
import { useUserStore } from '@/store/useUserStore';
import { ProfileCardLayout } from '@/components/ProfileCard/ProfileCardLayout';
import { useProfileEdit } from './hooks/useProfileEdit';
import { ProfileImageEdit } from './components/ProfileImageEdit';
import { ProfileForm } from './components/ProfileForm';
import { ProfileActions } from './components/ProfileActions';

interface FormData {
  nickname: string;
  bio: string;
  profileImage: string | File;
  imagePreview?: string;
}

const ProfileCardEditPage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    bio: '',
    profileImage: '',
  });

  const { updateProfile, isLoading: isUpdating } = useProfileEdit(
    String(user?.userId),
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        if (!user?.userId) {
          navigate('/login');
          return;
        }

        const profile = await profileAPI.getUserProfile(String(user.userId));
        setFormData({
          nickname: profile.nickname,
          bio: profile.bio,
          profileImage: profile.profileImage,
        });
      } catch (error) {
        console.error('프로필 데이터 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user?.userId, navigate]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  const handleImageChange = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));

    // 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      const imagePreviewUrl = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        imagePreview: imagePreviewUrl,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      await updateProfile(formData);
    } catch (error) {
      console.error('프로필 수정 실패:', error);
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <ProfileCardLayout onClickOutside={handleClickOutside}>
      <ProfileImageEdit
        imageUrl={formData.imagePreview || (formData.profileImage as string)}
        onImageChange={handleImageChange}
      />
      <ProfileForm
        nickname={formData.nickname}
        bio={formData.bio}
        onNicknameChange={(value) =>
          setFormData((prev) => ({ ...prev, nickname: value }))
        }
        onBioChange={(value) =>
          setFormData((prev) => ({ ...prev, bio: value }))
        }
      />
      <ProfileActions
        onSubmit={handleSubmit}
        isLoading={isUpdating}
      />
    </ProfileCardLayout>
  );
};

export default ProfileCardEditPage;
