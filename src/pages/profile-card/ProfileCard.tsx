import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import copyIcon from '@assets/profile-card/copy-icon.svg';
import shareIcon from '@assets/profile-card/share-icon.svg';
import pointIcon from '@assets/toast/coin.png';

const ProfileCard = () => {
  const navigate = useNavigate();

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
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
        <div className='@container relative w-[calc(100vw*0.4266)] max-w-[819px] h-[calc(100vw*0.3911)] max-h-[822px] min-w-[600px] min-h-[550px]'>
          {/* 뒤 배경 */}
          <div
            className='absolute w-full h-full bg-[#73A1F7] rounded-[60px] border-2 border-[#2656CD]'
            style={{ bottom: '-24px', left: '0' }}></div>

          {/* 메인 배경 */}
          <section className='relative flex-col items-center pt-12 guest-book 2xl:pt-20 px-13 2xl:px-16'>
            {/* 포인트 */}
            <div className='flex items-center gap-2 bg-[#B5B5B5]/10 rounded-full px-3 py-1.5 absolute top-10 left-10'>
              <img
                src={pointIcon}
                alt='사용자 현재 포인트'
                className='w-4 h-4'
              />
              <span className='text-[#162C63] text-xs'>100P</span>
            </div>

            {/* 공유 버튼 */}
            <button className='flex items-center gap-2 hover:bg-[#B5B5B5]/10 rounded-full px-1.5 py-1.5 transition-all absolute top-10 right-10'>
              <img
                src={shareIcon}
                alt='공유 버튼'
                className='w-6 h-6'
              />
            </button>

            
            {/* 사용자 프로필 */}
            <img
              src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEyMTFfMjU0%2FMDAxNzMzODg1NDI1MzA3.VROvADpR2srcPOcEaDyA-9MVaVz5dqNwJD24qrbXFz0g.4NuJKBzpFM-9JCNct1S5n-L9EjWQ1lTbRD4tV6xsB70g.JPEG%2FIMG_1593.JPG&type=sc960_832'
              alt='사용자 프로필'
              className='rounded-full h-25 w-25'
            />
            <h2 className='text-2xl font-bold'>찰스엔터</h2>
            <p className='text-sm text-[#162C63]'>내가 선생이야 누나야</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
