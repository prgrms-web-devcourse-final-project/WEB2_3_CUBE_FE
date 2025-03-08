import { useEffect, useState } from 'react';
import backgroundIMG from '@/assets/roome-background-img.png';
import { getCdRack } from '@apis/cd';
import { useParams } from 'react-router-dom';
import Loading from '@components/Loading';
import CdStatus from './components/CdStatus';

export default function CdRackPage() {
  const [cdRackInfo, setCDRackInfo] = useState<CDRackInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cursor, setCursor] = useState(0);
  const [cursorHistory, setCursorHistory] = useState<number[]>([0]);
  const userId = Number(useParams().userId);

  const handlePrevPage = () => {
    if (cursorHistory.length > 1) {
      cursorHistory.pop();
      const prevCursor = cursorHistory[cursorHistory.length - 1];
      setCursorHistory(cursorHistory);
      setCursor(prevCursor);
    }
  };
  const handleNextPage = (cursor: number) => {
    setCursorHistory((prev) => [...prev, cursor]);
    setCursor(cursor);
  };

  // 내 cd 목록 불러오기
  useEffect(() => {
    const fetchCds = async () => {
      try {
        setIsLoading(true);

        const result = await getCdRack(userId, 15, cursor);
        setCDRackInfo(result);
      } catch (error) {
        console.error('cd 목록을 가져오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCds();
  }, [cursor, userId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    // 뒷 배경
    <div
      className='w-full h-screen bg-center bg-no-repeat bg-cover'
      style={{ backgroundImage: `url(${backgroundIMG})` }}>
      <div className=' w-full h-screen bg-[#3E507DCC] backdrop-blur-[35px] '>
        <CdStatus
          cdRackInfo={cdRackInfo}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>
    </div>
  );
}
