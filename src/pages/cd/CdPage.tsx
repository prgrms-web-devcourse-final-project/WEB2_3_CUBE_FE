import backgroundIMG from '@/assets/roome-background-img.png';
import CdTemplate from './components/template/CdTemplate';
import CdInfo from './components/CdInfo';
import CdComment from './components/comments/CdComment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '@components/Loading';
import { useFetchCdInfo } from '@hooks/cd/useFetchCdInfo';
import CdPlayer from './components/player/CdPlayer';

export default function CdPage() {
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(0);
  const { cdInfo, isCdPlaying, isLoading, userId, setIsCdPlaying } =
    useFetchCdInfo();

  // 뒤로가기시 cd 렉페이지로 이동
  useEffect(() => {
    // window.history.pushState(null, '', window.location.href);
    const handleBackButton = () => {
      navigate(`/cdrack/${userId}`, { replace: true });
    };
    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

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
          cdPlaying={isCdPlaying}
        />
        <CdComment currentTime={currentTime} />
      </div>
      {/* 플레이어 */}
      <CdPlayer
        cdInfo={cdInfo}
        setCdPlaying={setIsCdPlaying}
        setCurrentTime={setCurrentTime}
      />
    </div>
  );
}
