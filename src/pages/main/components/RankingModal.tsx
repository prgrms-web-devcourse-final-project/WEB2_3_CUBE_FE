import exProfile from '@assets/rank/exProfile.png';
import closeIcon from '@assets/rank/rank-close-icon.svg';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import RankingItem from './RankingItem';
import TopRankingItem from './TopRankingItem';

const rankingMocData = [
  { rank: 1, nickname: 'Adnming', visits: 500, profileImg: exProfile },
  { rank: 2, nickname: '최보아', visits: 450, profileImg: exProfile },
  { rank: 3, nickname: '채보아', visits: 400, profileImg: exProfile },
];

const otherRankingMocData = [
  { rank: 4, nickname: '닉네임이야원', visits: 350 },
  { rank: 5, nickname: '닉네임이야', visits: 300 },
  { rank: 6, nickname: '닉네임이', visits: 280 },
  { rank: 7, nickname: '닉네임', visits: 260 },
  { rank: 8, nickname: '닉네임', visits: 240 },
  { rank: 9, nickname: '닉네임', visits: 220 },
  { rank: 10, nickname: '닉네임', visits: 200 },
];

export default function RankingModal({ onClose }) {
  const rankModalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        rankModalRef.current &&
        !rankModalRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <motion.section
      ref={rankModalRef}
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100vh', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 130, damping: 18 }}
      className={`@container rank-modal backdrop-blur-2xl rounded-3xl p-2.5 @8xl:p-4 drop-shadow-modal items-center justify-center absolute bottom-10 @8xl:bottom-15 left-10 @2xl:left-20
    `}>
      <div className='@container w-full h-full bg-[#F9FCFF] rounded-2xl place-content-center px-7 @2xl:p-12 overflow-hidden'>
        <img
          onClick={onClose}
          className='absolute right-6 top-6 @8xl:top-8 @8xl:right-8 @8xl:w-6 opacity-20 hover:opacity-100'
          src={closeIcon}
          alt='랭킹 닫기'
        />
        {/* 랭킹 컨텐츠 */}
        <div className='flex flex-col items-center gap-6 @2xl:gap-6'>
          <h2 className='font-bold text-2xl text-[#162C63]'>
            RANKING
          </h2>
          {/* 랭킹 1~3위 */}
          <div className='flex flex-row items-end gap-4 @2xl:gap-5'>
            {rankingMocData.map((user) => (
              <TopRankingItem
                key={user.rank}
                {...user}
              />
            ))}
          </div>
          {/* 랭킹 4~10위 */}
          <div className='w-full flex flex-col gap-2.5'>
            {otherRankingMocData.map((user) => (
              <RankingItem
                key={user.rank}
                {...user}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
