import { useEffect, useState } from 'react';
import backgroundIMG from '@/assets/roome-background-img.png';
import NotEmptyStatus from './components/NotEmptyStatus';
import EmptyStatus from './components/EmptyStatus';
import { useUserStore } from '@/store/useUserStore';
import { getCdRack } from '@apis/cd';
import { useParams } from 'react-router-dom';
import { Loader } from '@react-three/drei';
import Loading from '@components/Loading';

export default function CdRackPage() {
  const [cdRackInfo, setCDRackInfo] = useState({ data: [], nextCursor: 0 });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUserStore((state) => state.user);

  const myUserId = user.userId;
  const userId = Number(useParams().userId);

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  // 내 cd 목록 불러오기
  useEffect(() => {
    const fetchCds = async () => {
      try {
        setIsLoading(true);

        const result = await getCdRack(myUserId, userId, 15, 0); // 아.. cursor에 뭔 값을 줘야 페이지네이션이 되려나..
        setCDRackInfo(result);
      } catch (error) {
        console.error('cd 목록을 가져오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCds();
  }, [page]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    // 뒷 배경
    <div
      className='w-full h-screen bg-center bg-no-repeat bg-cover'
      style={{ backgroundImage: `url(${backgroundIMG})` }}>
      <div className=' w-full h-screen bg-[#3E507DCC] backdrop-blur-[35px] '>
        {cdRackInfo.data.length > 0 ? (
          <NotEmptyStatus
            cdRackInfo={cdRackInfo}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
        ) : (
          <EmptyStatus />
        )}
      </div>
    </div>
  );
}
