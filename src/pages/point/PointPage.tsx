import { useUserStore } from '@/store/useUserStore';
import { getPointBalance, getPointHistory } from '@apis/point';
import receipt from '@assets/point/receipt.svg';
import coin from '@assets/point/coin.svg';

import LayeredButton from '@components/LayeredButton';
import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import PointHistory from './components/PointHistory';

export default function PointPage() {
  const navigate = useNavigate();
  const [pointBalance, setPointBalance] = useState(0);

  const userId = Number(useParams().userId);
  const myUserId = useUserStore((state) => state.user).userId;

  const { ref, inView } = useInView();

  // useInfiniteQuery
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['points', userId],
      queryFn: async ({ pageParam }) => {
        return pageParam.dayCursor
          ? fetchPointsHistory(pageParam?.itemCursor, pageParam.dayCursor)
          : fetchPointsHistory(pageParam?.itemCursor);
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.nextItemCursor > lastPage.lastId) {
          return {
            itemCursor: lastPage.nextItemCursor,
            dayCursor: lastPage.nextDayCursor,
          };
        }
        return undefined;
      },
      initialPageParam: { itemCursor: 0, dayCursor: '' },
      staleTime: 1000 * 60 * 1, // 1분
    });

  useEffect(() => {
    const fetchPointBalance = async () => {
      try {
        const { balance } = await getPointBalance(userId);
        setPointBalance(balance);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPointBalance();
  }, [userId]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const fetchPointsHistory = async (itemCursor: number, dayCursor?: string) => {
    const result = dayCursor
      ? await getPointHistory(30, itemCursor, dayCursor)
      : await getPointHistory(30, itemCursor);
    return result;
  };

  if (userId !== myUserId) {
    navigate(`/profile/${userId}`);
  }
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  return (
    <div className='w-full h-screen main-background'>
      {/* 메인 배경 */}
      <motion.div
        initial={{ y: '100vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100vh', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 130, damping: 18 }}
        onClick={handleClickOutside}
        className='fixed inset-0 z-10 flex items-center justify-center'>
        {/* 영수증 */}
        <div className='relative w-[501px] h-[730px]'>
          <div
            style={{ backgroundImage: `url(${receipt})` }}
            className='w-full h-full bg-contain bg-no-repeat bg-center flex flex-col items-center  gap-10 '>
            <h1 className='mt-10 text-[#3E507D] text-[30px] font-bold'>
              Point Receipt
            </h1>

            <PointHistory
              data={data}
              isFetching={isFetching}
              ref={ref}
            />

            <div className='mb-8 w-[70%]'>
              <div className='flex justify-between items-center mb-6 '>
                <p className='text-[#162C63] font-medium text-sm'>
                  포인트 잔고
                </p>

                <div className='flex items-center gap-1'>
                  <img
                    src={coin}
                    alt='코인 이미지'
                    className='w-4 h-4'
                  />
                  <p className='text-[#162C63] text-sm font-medium'>
                    {pointBalance.toLocaleString('ko-KR')}P
                  </p>
                </div>
              </div>

              <div className='flex flex-col items-center gap-2'>
                <LayeredButton
                  theme='blue'
                  containerClassName='w-fit'
                  className='font-bold w-[160px] h-[40px] py-1.5'
                  disabled={isLoading}
                  onClick={() => navigate('/payment')}>
                  포인트 충전하기
                </LayeredButton>

                <button
                  className='text-sm text-[#3E507D]/30 mt-2'
                  onClick={() => navigate('/payment/refund')}>
                  포인트 환불하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
