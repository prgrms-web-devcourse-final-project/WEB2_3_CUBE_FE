import { useState } from 'react';
import backgroundIMG from '@/assets/roome-background-img.png';
import Loading from '@components/Loading';
import CdStatus from './components/CdStatus';
import { useFetchCdLists } from '@hooks/cdrack/useFetchCdLists';

export default function CdRackPage() {
  const [cursorHistory, setCursorHistory] = useState<number[]>([0]);

  const { cdRackInfo, setCdRackInfo, isLoading, setCursor } = useFetchCdLists();

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
          setCdRackInfo={setCdRackInfo}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>
    </div>
  );
}
