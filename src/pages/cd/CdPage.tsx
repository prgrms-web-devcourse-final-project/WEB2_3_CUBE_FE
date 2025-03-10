import backgroundIMG from '@/assets/roome-background-img.png';
import CdTemplate from './components/CdTemplate';
import CdInfo from './components/CdInfo';
import CdComment from './components/CdComment';
import CdPlayer from './components/CdPlayer';
import { useEffect, useState } from 'react';
import { getCdInfo } from '@apis/cd';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '@components/Loading';

export default function CdPage() {
  const navigate = useNavigate();
  const [cdInfo, setCdInfo] = useState<CDInfo | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [cdPlaying, setCdPlaying] = useState(false);

  const [cdTime, setCdTime] = useState(0);

  const myCdId = Number(useParams().cdId);
  const userId = Number(useParams().userId);

  // 뒤로가기시 cd 렉페이지로 이동
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handleBackButton = () => {
      navigate(`/cdrack/${userId}`, { replace: true });
    };
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  useEffect(() => {
    const fetchCdInfo = async () => {
      try {
        const result = await getCdInfo(myCdId, userId);
        setCdInfo(result);
        setCdPlaying(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCdInfo();
  }, [myCdId, userId]);

  if (isLoading) return <Loading />;

  return (
    <div
      className={`flex flex-col justify-between w-full h-screen bg-center bg-no-repeat bg-cover`}
      style={{ backgroundImage: `url(${backgroundIMG})` }}>
      {/* 템플릿, CD이미지, 댓글 */}
      <div className='flex justify-center items-end gap-22   h-[87vh] px-22  pt-17 pb-19  '>
        <CdTemplate />
        <CdInfo
          cdInfo={cdInfo}
          cdPlaying={cdPlaying}
        />
        <CdComment commentTime={cdTime} />
      </div>
      {/* 플레이어 */}
      <CdPlayer
        cdInfo={cdInfo}
        onCdPlaying={setCdPlaying}
        onCdTime={setCdTime}
      />
    </div>
  );
}
