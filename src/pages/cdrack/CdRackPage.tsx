import { useEffect, useState } from 'react';
import backgroundIMG from '@/assets/roome-background-img.png';
import NotEmptyStatus from './components/NotEmptyStatus';
import EmptyStatus from './components/EmptyStatus';
import { mockCD } from '@/mocks/mockCD';

export default function CdRackPage() {
  const [cdDatas, setCDdatas] = useState([]);

  // 내 cd 목록 불러오기
  useEffect(() => {
    setCDdatas(mockCD);
  }, []);
  return (
    // 뒷 배경
    <div
      className='w-full h-screen bg-center bg-no-repeat bg-cover'
      style={{ backgroundImage: `url(${backgroundIMG})` }}>
      <div className=' w-full h-screen bg-[#3E507DCC] backdrop-blur-[35px] '>
        {cdDatas.length > 0 ? (
          <NotEmptyStatus datas={cdDatas} />
        ) : (
          <EmptyStatus />
        )}
      </div>
    </div>
  );
}
