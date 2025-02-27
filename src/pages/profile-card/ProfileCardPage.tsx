import { useNavigate, useParams } from 'react-router-dom';
import shareIcon from '@assets/profile-card/share-icon.svg';
import pointIcon from '@assets/toast/coin.png';
import UserProfileSection from './components/UserProfileSection';
import GenreCard from './components/GenreCard';
import RecommendedUserList from './components/RecommendedUserList';
import ProfileButtons from './components/ProfileButtons';
import { ProfileCardLayout } from './components/ProfileCardLayout';
import { useProfileData } from './hooks/useProfileData';

const ProfileCardPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    userProfile,
    recommendedUsers,
    isLoading,
    isMyProfile,
    handleProfileUpdate,
  } = useProfileData(userId);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  const handleShareButtonClick = async () => {
    if (!userId || !userProfile) return;

    try {
      const shareData = {
        title: `${userProfile.nickname}님의 프로필`,
        text: `${userProfile.nickname}님의 취향이 담긴 방을 확인해보세요!`,
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

  if (isLoading || !userProfile) {
    return <div>로딩 중...</div>;
  }

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
          nickname: userProfile.nickname,
          profileImage: userProfile.profileImage,
          bio: userProfile.bio,
        }}
      />

      {/* 취향 카드 */}
      <div
        aria-label='취향 카드'
        className='w-full gap-2 item-between'>
        <GenreCard
          title='음악 감성'
          genres={userProfile.musicGenres}
        />
        <GenreCard
          title='독서 취향'
          genres={userProfile.bookGenres}
        />
      </div>

      {/* 유저 추천 */}
      <RecommendedUserList users={recommendedUsers} />

      {/* 메이트 취소/추가 및 방 구경하기 버튼 */}
      {userId && (
        <ProfileButtons
          userId={userId}
          isMyProfile={isMyProfile}
          isMatched={userProfile.isMatched}
          onProfileUpdate={handleProfileUpdate}
        />
      )}
    </ProfileCardLayout>
  );
};

export default ProfileCardPage;
