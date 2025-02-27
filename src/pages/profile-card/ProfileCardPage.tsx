import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { useUserProfile } from '@/hooks/useUserProfile';
import { ProfileCardLayout } from '@/components/profile-card/ProfileCardLayout';
import shareIcon from '@/assets/profile-card/share-icon.svg';
import pointIcon from '@/assets/toast/coin.png';
import UserProfileSection from './components/UserProfileSection';
import GenreCard from './components/GenreCard';
import RecommendedUserList from './components/RecommendedUserList';
import ProfileButtons from './components/ProfileButtons';

const ProfileCardPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { profile, updateProfile } = useUserProfile(userId || undefined);

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }
    updateProfile();
  }, [userId, navigate, updateProfile]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  const handleShareButtonClick = async () => {
    if (!userId || !profile) return;

    try {
      const shareData = {
        title: `${profile.nickname}님의 프로필`,
        text: `${profile.nickname}님의 취향이 담긴 방을 확인해보세요!`,
        url: `${window.location.origin}/room/${userId}`,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        // TODO: 복사 완료 토스트 메시지 표시
      }
    } catch (error) {
      console.error('공유하기 실패:', error);
    }
  };

  if (!profile) {
    return <div>로딩 중...</div>;
  }

  const isMyProfile = user?.userId === Number(userId);

  return (
    <ProfileCardLayout onClickOutside={handleClickOutside}>
      {/* 포인트 */}
      <button className='flex items-center gap-2 bg-[#B5B5B5]/10 rounded-full px-3 py-1.5 absolute top-10 left-10'>
        <img
          src={pointIcon}
          alt='사용자 현재 포인트'
          className='w-4 h-4'
        />
        <span className='text-[#162C63] text-xs'>100P</span>
      </button>

      {/* 공유 버튼 */}
      <button
        onClick={handleShareButtonClick}
        className='flex items-center gap-2 hover:bg-[#B5B5B5]/10 rounded-full px-1.5 py-1.5 transition-all absolute top-10 right-10'>
        <img
          src={shareIcon}
          alt='공유 버튼'
          className='w-6 h-6'
        />
      </button>

      {/* 사용자 프로필 */}
      <UserProfileSection
        profile={{
          nickname: profile.nickname,
          profileImage: profile.profileImage,
          bio: profile.bio,
        }}
      />

      {/* 취향 카드 */}
      <div
        aria-label='취향 카드'
        className='w-full gap-2 item-between'>
        <GenreCard
          title='음악 감성'
          genres={profile.musicGenres}
        />
        <GenreCard
          title='독서 취향'
          genres={profile.bookGenres}
        />
      </div>

      {/* 유저 추천 */}
      {profile.recommendedUsers && profile.recommendedUsers.length > 0 && (
        <RecommendedUserList users={profile.recommendedUsers} />
      )}

      {/* 메이트 취소/추가 및 방 구경하기 버튼 */}
      {userId && (
        <ProfileButtons
          userId={userId}
          isMyProfile={isMyProfile}
          onProfileUpdate={updateProfile}
        />
      )}
    </ProfileCardLayout>
  );
};

export default ProfileCardPage;
