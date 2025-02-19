import React, { useEffect, useState } from 'react';
import backgroundIMG from '@/assets/roome-background-img.png';
import { mockCD } from '@/mocks/mockCd';
import EmptyStatus from './components/EmptyStatus';
import NotEmptyStatus from './components/NotEmptyStatus';

export default function CdRackPage() {
  const [cdDatas, setCDdatas] = useState([]);

  useEffect(() => {
    setCDdatas(mockCD);
  }, []);
  return (
    // 뒷 배경
    <div
      className='bg-cover bg-center bg-no-repeat    w-full h-screen'
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
