import { useEffect, useState } from 'react';
import backgroundIMG from '@/assets/roome-background-img.png';
import NotEmptyStatus from './components/NotEmptyStatus';
import EmptyStatus from './components/EmptyStatus';
import { getCdRack } from '@apis/cd';
import { useUserStore } from '@/store/useUserStore';

export default function CdRackPage() {
  const [cdDatas, setCDdatas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUserStore((state) => state.user);
  // console.log(user);

  // 내 cd 목록 불러오기
  useEffect(() => {
    const fetchCds = async () => {
      try {
        setIsLoading(true);
        const response = await getCdRack(user.userId);
        setCDdatas(response);
      } catch (error) {
        console.error('cd 목록을 가져오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCds();
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    // 뒷 배경
    <div
      className='w-full h-screen bg-center bg-no-repeat bg-cover'
      style={{ backgroundImage: `url(${backgroundIMG})` }}>
      <div className=' w-full h-screen bg-[#3E507DCC] backdrop-blur-[35px] '>
        {cdDatas.data.length > 0 ? (
          <NotEmptyStatus cdDatas={cdDatas} />
        ) : (
          <EmptyStatus />
        )}
      </div>
    </div>
  );
}
