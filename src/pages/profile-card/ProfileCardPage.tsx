import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import shareIcon from '@assets/profile-card/share-icon.svg';
import pointIcon from '@assets/toast/coin.png';
import UserProfileSection from './components/UserProfileSection';
import GenreCard from './components/GenreCard';
import RecommendedUserList from './components/RecommendedUserList';
import ProfileButtons from './components/ProfileButtons';
import { useEffect, useState } from 'react';
import { profileAPI } from '@apis/profile';
import { housemateAPI } from '@apis/housemate';
import { useUserStore } from '../../store/useUserStore';

const ProfileCardPage = () => {
  const { userId } = useParams();
  const { user } = useUserStore();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendedUsers, setRecommendedUsers] = useState<RecommendedUser[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        if (!userId) return;

        // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        if (!user) {
          navigate('/login');
          return;
        }

        const [profile, recommendations] = await Promise.all([
          profileAPI.getUserProfile(userId),
          profileAPI.getRecommendedUsers(userId),
        ]);

        // 현재 로그인한 사용자의 프로필인지 직접 확인 (로직 분기용)
        const currentIsMyProfile = userId === String(user.userId);
        setIsMyProfile(currentIsMyProfile);

        // 다른 유저의 프로필인 경우에만 메이트 여부 확인
        let isMatched = false;
        if (!currentIsMyProfile) {
          const following = await housemateAPI.getFollowing(
            undefined,
            undefined,
            profile.nickname,
          );
          isMatched = following.length > 0;
        }

        // API 응답을 UserProfile 타입에 맞게 변환 (UI 렌더링용 myProfile은 API 값 사용)
        const userProfileData: UserProfile = {
          ...profile,
          isMatched,
        };

        console.log(userProfileData);

        setUserProfile(userProfileData);
        setRecommendedUsers(recommendations);
        // console.log(
        //   'userProfileData',
        //   userProfileData,
        //   'recommendations',
        //   recommendations,
        // );
      } catch (error) {
        console.error('프로필 데이터 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId, user, navigate]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  const handleProfileUpdate = async () => {
    if (!userId) return;

    try {
      const profile = await profileAPI.getUserProfile(userId);
      const currentIsMyProfile = userId === String(user?.userId);
      let isMatched = false;

      if (!currentIsMyProfile) {
        const following = await housemateAPI.getFollowing(
          undefined,
          undefined,
          profile.nickname,
        );
        isMatched = following.length > 0;
      }

      const userProfileData: UserProfile = {
        ...profile,
        isMatched,
      };
      setUserProfile(userProfileData);
    } catch (error) {
      console.error('프로필 정보 업데이트 실패:', error);
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
    <div className='w-full h-screen main-background'>
      <motion.div
        initial={{ y: '100vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100vh', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 130, damping: 18 }}
        onClick={handleClickOutside}
        className='fixed inset-0 z-10 flex items-center justify-center'>
        <div className='@container relative w-[660px] h-[660px]'>
          {/* 뒤 배경 */}
          <div
            className='absolute w-[660px] h-[660px] bg-[#73A1F7] rounded-[60px] border-2 border-[#2656CD]'
            style={{ bottom: '-24px', left: '0' }}></div>

          {/* 메인 배경 */}
          <section className='relative flex flex-col gap-4 items-center justify-around w-[660px] h-[660px] bg-[#FCF7FD] rounded-[60px] border-2 border-[#2656CD] p-13'>
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
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCardPage;
