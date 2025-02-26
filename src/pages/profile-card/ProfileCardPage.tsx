import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import shareIcon from '@assets/profile-card/share-icon.svg';
import pointIcon from '@assets/toast/coin.png';
import UserProfileSection from './components/UserProfileSection';
import GenreCard from './components/GenreCard';
import RecommendedUserList from './components/RecommendedUserList';
import ProfileButtons from './components/ProfileButtons';

interface ProfileCardProps {
  userProfile?: UserProfile;
  recommendedUsers?: RecommendedUser[];
}

const defaultProfile: UserProfile = {
  id: '0',
  nickname: '찰스엔터',
  profileImage:
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEyMTFfMjU0%2FMDAxNzMzODg1NDI1MzA3.VROvADpR2srcPOcEaDyA-9MVaVz5dqNwJD24qrbXFz0g.4NuJKBzpFM-9JCNct1S5n-L9EjWQ1lTbRD4tV6xsB70g.JPEG%2FIMG_1593.JPG&type=sc960_832',
  bio: '내가 선생이야 누나야',
  musicGenres: ['HIPHOP', 'ROCK', 'JAZZ'],
  bookGenres: ['SF', 'ROMANCE', 'THRILLER'],
  myProfile: false,
};

const defaultRecommendedUsers: RecommendedUser[] = [
  {
    userId: '1',
    nickname: '추천유저1',
    profileImage:
      'https://i.pinimg.com/736x/9e/00/8e/9e008e514cc474b12d7190c9e87ebf48.jpg',
  },
  {
    userId: '2',
    nickname: '추천유저2',
    profileImage:
      'https://i.pinimg.com/736x/9e/00/8e/9e008e514cc474b12d7190c9e87ebf48.jpg',
  },
  {
    userId: '3',
    nickname: '추천유저3',
    profileImage:
      'https://i.pinimg.com/736x/9e/00/8e/9e008e514cc474b12d7190c9e87ebf48.jpg',
  },
  {
    userId: '4',
    nickname: '추천유저4',
    profileImage:
      'https://i.pinimg.com/736x/9e/00/8e/9e008e514cc474b12d7190c9e87ebf48.jpg',
  },
  {
    userId: '5',
    nickname: '추천유저5',
    profileImage:
      'https://i.pinimg.com/736x/9e/00/8e/9e008e514cc474b12d7190c9e87ebf48.jpg',
  },
  {
    userId: '6',
    nickname: '추천유저6',
    profileImage:
      'https://i.pinimg.com/736x/9e/00/8e/9e008e514cc474b12d7190c9e87ebf48.jpg',
  },
];

const ProfileCardPage = ({
  userProfile = defaultProfile,
  recommendedUsers = defaultRecommendedUsers,
}: ProfileCardProps) => {
  const navigate = useNavigate();

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  const handleMateButtonClick = () => {
    // TODO: 메이트 추가/취소 로직 구현
  };

  const handleRoomButtonClick = () => {
    // TODO: 방 구경하기 로직 구현
  };

  const handleShareButtonClick = () => {
    //  TODO: 공유 로직 구현
  };

  const handlePointButtonClick = () => {
    navigate('/profile/:userId/edit');
  };

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
            <button
              onClick={handlePointButtonClick}
              className='flex items-center gap-2 bg-[#B5B5B5]/10 rounded-full px-3 py-1.5 absolute top-10 left-10'>
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
            <ProfileButtons
              isMyProfile={userProfile.myProfile}
              onMateButtonClick={handleMateButtonClick}
              onRoomButtonClick={handleRoomButtonClick}
            />
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCardPage;
