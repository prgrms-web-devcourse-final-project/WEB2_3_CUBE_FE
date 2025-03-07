import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { useUserProfile } from '@/hooks/useUserProfile';
import { ProfileCardLayout } from './components/ProfileCardLayout';
import shareIcon from '@/assets/profile-card/share-icon.svg';
import pointIcon from '@/assets/toast/coin.png';
import shareImage from '@/assets/share-thumbnail.png'; // 공유용 썸네일 이미지
import UserProfileSection from './components/UserProfileSection';
import GenreCard from './components/GenreCard';
import RecommendedUserList from './components/RecommendedUserList';
import ProfileButtons from './components/ProfileButtons';
import { useToastStore } from '@/store/useToastStore';
import Loading from '@components/Loading';
import { getPointBalance } from '@/apis/point';

const ProfileCardPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { profile, updateProfile } = useUserProfile(userId || undefined);
  const { showToast } = useToastStore();
  const [pointBalance, setPointBalance] = useState<number>(0);

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }
    updateProfile();

    // 포인트 잔액 조회
    const fetchPointBalance = async () => {
      try {
        const response = await getPointBalance();
        setPointBalance(response.balance);
      } catch (error) {
        console.error('포인트 잔액 조회 실패:', error);
        setPointBalance(0);
      }
    };

    if (user?.userId === Number(userId)) {
      fetchPointBalance();
    }
  }, [userId, navigate, updateProfile, user?.userId]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  const handleShareButtonClick = async () => {
    if (!userId || !profile) return;

    try {
      const shareData: {
        title: string;
        text: string;
        url: string;
        files?: File[];
      } = {
        title: `${profile.nickname}님의 프로필`,
        text: `${profile.nickname}님의 취향이 담긴 방을 확인해보세요!`,
        url: `${window.location.origin}/profile/${userId}`,
      };

      if (navigator.canShare) {
        try {
          const response = await fetch(shareImage);
          const blob = await response.blob();
          const file = new File([blob], 'share-thumbnail.png', {
            type: 'image/png',
          });

          if (navigator.canShare({ files: [file] })) {
            shareData.files = [file];
          }
        } catch (error) {
          console.error('이미지 처리 실패:', error);
          // 이미지 처리 실패 시에도 계속 진행 (이미지 없이 공유)
        }
      }

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (error) {
          // AbortError는 사용자가 의도적으로 취소한 것이므로 에러 메시지를 표시하지 않음
          if (error instanceof Error && error.name !== 'AbortError') {
            console.error('공유하기 실패:', error);
            showToast('공유하기에 실패했습니다.', 'error');
          }
        }
      } else {
        await navigator.clipboard.writeText(shareData.url);
        showToast('프로필 카드 링크가 복사되었습니다.', 'success');
      }
    } catch (error) {
      console.error('공유하기 실패:', error);
      showToast('링크 복사에 실패했습니다.', 'error');
    }
  };

  if (!profile) {
    return <Loading />;
  }

  const isMyProfile = user?.userId === Number(userId);

  return (
    <ProfileCardLayout onClickOutside={handleClickOutside}>
      {/* 포인트 */}
      {isMyProfile && (
        <button
          onClick={() => navigate(`/point/${userId}`)}
          className='flex items-center gap-2 bg-[#B5B5B5]/10 rounded-full px-3 py-1.5 absolute top-10 left-10'>
          <img
            src={pointIcon}
            alt='사용자 현재 포인트'
            className='w-4 h-4'
          />
          <span className='text-[#162C63] text-xs'>
            {pointBalance.toLocaleString('ko-KR')}P
          </span>
        </button>
      )}

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
        className='gap-2 w-full item-between'>
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
      <RecommendedUserList users={profile.recommendedUsers || []} />

      {/* 메이트 취소/추가 및 방 구경하기 버튼 */}
      {userId && (
        <ProfileButtons
          userId={userId}
          isMyProfile={isMyProfile}
          isFollowing={profile.following}
          onProfileUpdate={updateProfile}
        />
      )}
    </ProfileCardLayout>
  );
};

export default ProfileCardPage;
