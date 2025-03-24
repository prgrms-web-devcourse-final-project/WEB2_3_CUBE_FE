import { useMemo, useState } from 'react';

import ModalBackground from '@components/ModalBackground';
import DataList from '@components/datalist/DataList';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import { useFetchSearchCdLists } from '@hooks/cd/useFetchSearchCdLists';
import { useYouTubeEvents } from '@hooks/cd/useYoutubeEvent';
import { useCdPlayerState } from '@hooks/cd/useCdPlayerState';
import { useYoutubeControls } from '@hooks/cd/useYoutubeControls';
import Progressbar from './Progressbar';
import LeftGroup from './LeftGroup';
import MiddleGroup from './MiddleGroup';
import RightGroup from './RightGroup';

export default function CdPlayer({
  cdInfo,
  setCdPlaying,
  setCurrentTime,
}: {
  cdInfo: CDInfo;
  setCdPlaying: (value: boolean) => void;
  setCurrentTime: (value: number) => void;
}) {
  const VOLUME = 10; // 기본 볼륨
  const [isCdListOpen, setIsCdListOpen] = useState(false);
  const { userId: userIdParam } = useParams();
  const userId = useMemo(() => Number(userIdParam), [userIdParam]);

  // 현재 시간 툴팁(호버할때마다 리렌더링되는것을 막기위해 직접 DOM조작)

  const videoId = useMemo(() => {
    const match = cdInfo?.youtubeUrl.match(/[?&]v=([^&]+)/);
    return match ? match[1] : '';
  }, [cdInfo.youtubeUrl]);

  const opts = {
    height: '0',
    width: '0',
    // playerVars: {
    //   autoplay: 1,
    // },
  };
  //
  const { cdRackInfo, isLoading, lastMyCdId, setCursor, setSearchInput } =
    useFetchSearchCdLists(userId);

  // CD 플레이어 상태
  const {
    cdReady,
    setCdReady,
    cdPlayer,
    setCdPlayer,
    progressStyle,
    volumeProgressStyle,
  } = useCdPlayerState(VOLUME);

  // YouTube 이벤트 핸들러
  const { cdStateChangeEvent, handleYouTubeReady, handleYouTubeStateChange } =
    useYouTubeEvents(
      cdReady,
      setCdReady,
      setCdPlayer,
      setCdPlaying,
      setCurrentTime,
      VOLUME,
    );

  // Youtube 컨트롤 관련 함수들
  const {
    handleChangeTime,
    handleMuteCdVolume,
    handleChangeCdVolume,
    handleOnOffCd,
    handleToggleLoop,
  } = useYoutubeControls(
    cdReady,
    cdPlayer,
    cdStateChangeEvent,
    setCdReady,
    setCdPlayer,
    setCdPlaying,
  );

  return (
    <>
      {isCdListOpen && (
        <ModalBackground onClose={() => setIsCdListOpen(false)}>
          <DataList
            setSearchInput={setSearchInput}
            totalCount={cdRackInfo.totalCount}
            datas={cdRackInfo.data}
            type='cd'
            hasMore={cdRackInfo.nextCursor <= lastMyCdId.current}
            isLoading={isLoading}
            fetchMore={() => setCursor(cdRackInfo.nextCursor)}
            userId={userId}
          />
        </ModalBackground>
      )}

      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={handleYouTubeReady}
        onStateChange={handleYouTubeStateChange}
      />
      <section className='w-full h-[13vh] shrink-0 backdrop-blur-[20px] bg-white/10  '>
        {/* 진행 바 */}
        <Progressbar
          cdPlayer={cdPlayer}
          progressStyle={progressStyle}
          volumeProgressStyle={volumeProgressStyle}
          handleChangeTime={handleChangeTime}
        />

        <section className='flex relative items-center pr-10 w-full h-full'>
          {/* 왼쪽 그룹: 앨범 이미지와 음량 조절 */}
          <LeftGroup
            volume={VOLUME}
            cdInfo={cdInfo}
            cdReady={cdReady}
            cdStateChangeEvent={cdStateChangeEvent}
            handleChangeCdVolume={handleChangeCdVolume}
            handleMuteCdVolume={handleMuteCdVolume}
          />

          {/* 중앙 그룹: 재생 버튼*/}
          <MiddleGroup
            cdStateChangeEvent={cdStateChangeEvent}
            cdReady={cdReady}
            handleOnOffCd={handleOnOffCd}
          />
          {/* 오른쪽 그룹: 부가 기능 */}
          <RightGroup
            cdReady={cdReady}
            handleToggleLoop={handleToggleLoop}
            setIsCdListOpen={setIsCdListOpen}
          />
        </section>
      </section>
    </>
  );
}
