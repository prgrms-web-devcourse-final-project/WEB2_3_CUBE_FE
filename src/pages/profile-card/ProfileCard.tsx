import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import copyIcon from '@assets/profile-card/copy-icon.svg';
import shareIcon from '@assets/profile-card/share-icon.svg';
import pointIcon from '@assets/toast/coin.png';
import LayeredButton from '@components/LayeredButton';

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
        <div className='@container relative w-[660px] h-[660px]'>
          {/* 뒤 배경 */}
          <div
            className='absolute w-[660px] h-[660px] bg-[#73A1F7] rounded-[60px] border-2 border-[#2656CD]'
            style={{ bottom: '-24px', left: '0' }}></div>

          {/* 메인 배경 */}
          <section className='relative flex flex-col gap-4 items-center justify-around w-[660px] h-[660px] bg-[#FCF7FD] rounded-[60px] border-2 border-[#2656CD] p-13'>
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
            <div
              aria-label='사용자 프로필'
              className='flex flex-col items-center'>
              <img
                src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEyMTFfMjU0%2FMDAxNzMzODg1NDI1MzA3.VROvADpR2srcPOcEaDyA-9MVaVz5dqNwJD24qrbXFz0g.4NuJKBzpFM-9JCNct1S5n-L9EjWQ1lTbRD4tV6xsB70g.JPEG%2FIMG_1593.JPG&type=sc960_832'
                alt='사용자 프로필'
                className='rounded-full h-25 w-25'
              />
              <h2 className='text-2xl font-bold text-[#3E507D] mt-2'>
                찰스엔터
              </h2>
              <p className='text-sm font-medium text-[#AFAFAF]'>
                내가 선생이야 누나야
              </p>
            </div>

            {/* 취향 카드 */}
            <div
              aria-label='취향 카드'
              className='w-full gap-2 item-between'>
              <div className='item-row gap-2 bg-[#B5B5B5]/10 rounded-2xl px-8 py-4 w-full '>
                <h4 className='font-semibold text-[#224DBA] text-sm'>
                  음악 감성
                </h4>
                <span className='text-xs text-[#3E507D] bg-[#73A1F7]/20 rounded-full px-2 py-1 min-w-15 item-middle'>
                  힙합
                </span>
              </div>

              <div className='item-row gap-2 bg-[#B5B5B5]/10 rounded-2xl px-8 py-4 w-full '>
                <h4 className='font-semibold text-[#224DBA] text-sm'>
                  독서 취향
                </h4>
                <span className='text-xs text-[#3E507D] bg-[#73A1F7]/20 rounded-full px-2 py-1 min-w-15 item-middle'>
                  SF
                </span>
              </div>
            </div>

            {/* 유저 추천 */}
            <div className='item-row gap-2 bg-[#B5B5B5]/10 rounded-2xl px-8 py-4 w-full '>
              <h3 className='font-bold text-[#224DBA]'>
                나와 취향이 비슷한 유저
              </h3>

              {/* 유저 추천 아이템 */}
              <ul className='flex flex-col gap-2'>
                <li className='gap-2 bg-[#FCF7FD] rounded-xl px-5 py-4 item-row drop-shadow-logo'>
                  <img
                    src='https://i.pinimg.com/736x/9e/00/8e/9e008e514cc474b12d7190c9e87ebf48.jpg'
                    alt='유저 추천 아이템'
                    className='object-cover w-10 h-10 rounded-full'
                  />
                  <strong className='text-[#3E507D] font-semibold '>
                    찰스엔터
                  </strong>
                </li>
              </ul>
            </div>

            {/* 메이트 취소/추가 및 방 구경하기 버튼 */}
            <div className='gap-10 mt-5 item-middle'>
              <LayeredButton
                theme='gray'
                className='py-1.5'>
                메이트 취소
              </LayeredButton>
              <LayeredButton
                theme='blue'
                className='py-1.5'>
                방 구경하기
              </LayeredButton>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
