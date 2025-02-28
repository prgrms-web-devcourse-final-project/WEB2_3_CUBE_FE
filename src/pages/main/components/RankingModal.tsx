import closeIcon from '@assets/rank/rank-close-icon.svg';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { rankAPI } from '../../../apis/ranking';
import RankingItem from './RankingItem';
import TopRankingItem from './TopRankingItem';
import goldMedal from "@assets/rank/gold-medal.svg";
import TypingText from '../../../components/TypingText';

export default function RankingModal({ onClose }) {
  const [rankingData, setRankingData] = useState<RankData[] | null>([]);
  const rankModalRef = useRef(null);

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const rankData = await rankAPI.getRanking();
        setRankingData(rankData);
      } catch (error) {
        console.error('랭킹 불러오기 실패:', error);
      }
    };
    fetchRankData();
  }, []);

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
          {rankingData.length === 0 ? (
            <div className='flex flex-col items-center '>
            <p className='text-[#4B6BBA] text-sm @2xl:text-base font-medium'>
              높은 랭크를 달성할 수록
            </p>
            <p className='text-[#4B6BBA] text-sm @2xl:text-base font-medium mb-8'>
              더 많은 포인트를 받을 수 있어요! 
            </p>
            <img src={goldMedal} alt="" className='w-30 mb-10' />
            <TypingText text="랭크 측정 중 ..." speed={80} pauseTime={2000} className='absolute bottom-35 2xl:bottom-40 2xl:text-lg' />
            </div>
          ) : (
            <>
            <h2 className='font-bold text-2xl text-[#162C63]'>RANKING</h2>
              {/* 랭킹 1~3위 */}
              <div className='flex flex-row items-end gap-4 @2xl:gap-5'>
                {rankingData.slice(0, 3).map((user) => (
                  <TopRankingItem
                    key={user.rank}
                    user={user}
                  />
                ))}
              </div>
              {/* 랭킹 4~10위 */}
              <div className='w-full flex flex-col gap-2.5'>
                {rankingData.slice(3, 10).map((user) => (
                  <RankingItem
                    key={user.rank}
                    user={user}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
}
