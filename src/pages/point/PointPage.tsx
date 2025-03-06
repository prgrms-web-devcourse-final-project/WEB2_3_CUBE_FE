import { useUserStore } from '@/store/useUserStore';
import { getPointBalance, getPointHistory } from '@apis/point';
import receipt from '@assets/point/receipt.svg';
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
        return fetchPointsHistory(pageParam);
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.nextCursor > lastPage.lastId) {
          return lastPage.nextCursor;
        }
        return undefined;
      },
      initialPageParam: 0,
      staleTime: 1000 * 60 * 5, // 5분
    });

  useEffect(() => {
    const fetchPointBalance = async () => {
      try {
        const { balance } = await getPointBalance();
        setPointBalance(balance);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPointBalance();
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const fetchPointsHistory = async (cursor: number) => {
    const result = await getPointHistory(5, cursor);

    console.log(result);

    const history = result.history;

    // 날짜별로 묶어서 배열화
    const filteredByDates = history.reduce(
      (prev: PointHistory, cur: PointHistory) => {
        const dateKey = cur.dateTime.split(' ')[0];
        if (!prev[dateKey]) {
          prev[dateKey] = [];
        }
        prev[dateKey].push(cur);
        return prev;
      },
      {},
    );
    return { ...result, history: [...Object.entries(filteredByDates)] };
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
        <div className=' relative w-[501px] h-[760px]'>
          <img
            src={receipt}
            className=' inset-0 w-full h-full m-auto block text-center'
            alt='포인트 내역 영수증 '
          />
          <h1 className='absolute top-10 left-38 text-[#3E507D] text-[30px] font-bold'>
            Point Receipt
          </h1>
          <PointHistory
            data={data}
            isFetching={isFetching}
            ref={ref}
          />

          <p className='absolute bottom-33 left-12 text-[#162C63] text-[16px]'>
            포인트 잔고
          </p>

          {/* 포인트 */}
          <p className='absolute bottom-33 right-17 text-[#162C63] text-[16px]'>
            {pointBalance}
          </p>
          {/* 충전 버튼 */}

          <div className='absolute bottom-13 left-1/2 -translate-x-1/2'>
            <LayeredButton
              theme='blue'
              className=' text-[18px] font-bold w-[202px] h-[50px]'
              disabled={isLoading}>
              포인트 충전하기
            </LayeredButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
