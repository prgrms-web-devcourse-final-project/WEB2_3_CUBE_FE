import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { profileAPI } from '@apis/profile';
import { useUserStore } from '@/store/useUserStore';
import { ProfileCardLayout } from '../profile-card/components/ProfileCardLayout';
import { useProfileEdit } from './hooks/useProfileEdit';
import { ProfileImageEdit } from './components/ProfileImageEdit';
import { ProfileForm } from './components/ProfileForm';
import { ProfileActions } from './components/ProfileActions';
import { useToastStore } from '@/store/useToastStore';

interface FormData {
  nickname: string;
  bio: string;
  profileImage: string | File;
  imagePreview?: string;
  musicGenres: string[];
  bookGenres: string[];
}

const ProfileCardEditPage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    bio: '',
    profileImage: '',
    musicGenres: [],
    bookGenres: [],
  });
  const { showToast } = useToastStore();

  const {
    updateProfile,
    isLoading: isUpdating,
    validateImage,
  } = useProfileEdit();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        if (!user?.userId) {
          showToast('로그인이 필요한 서비스입니다.', 'error');
          navigate('/login');
          return;
        }

        const profile = await profileAPI.getUserProfile(String(user.userId));
        setFormData({
          nickname: profile.nickname || '',
          bio: profile.bio || '',
          profileImage: profile.profileImage || '',
          musicGenres: profile.musicGenres || [],
          bookGenres: profile.bookGenres || [],
        });
      } catch (error) {
        console.error('프로필 데이터 조회 실패:', error);
        showToast('프로필 정보를 불러오는데 실패했습니다.', 'error');
        navigate(-1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user?.userId, navigate, showToast]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  const handleImageChange = (file: File) => {
    try {
      validateImage(file);

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
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.nickname.trim()) {
      showToast('닉네임을 입력해주세요.', 'error');
      return;
    }

    try {
      await updateProfile({
        ...formData,
        bio: formData.bio.trim(),
      });
    } catch (error) {
      // 에러는 useProfileEdit에서 처리됨
    }
  };

  if (isLoading) {
    return (
      <ProfileCardLayout onClickOutside={handleClickOutside}>
        <div className='flex items-center justify-center h-full'>
          <p className='text-lg text-[#3E507D]'>프로필 정보를 불러오는 중...</p>
        </div>
      </ProfileCardLayout>
    );
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
