import { useEffect, useState } from 'react';
import soundIcon from '@assets/cd/sound-icon.svg';
import muteIcon from '@assets/cd/mute-icon.svg';

import prevSong from '@assets/cd/prev-song-icon.svg';
import nextSong from '@assets/cd/next-song-icon.svg';
import pauseSong from '@assets/cd/pause-icon.svg';
import playSong from '@assets/cd/play-icon.svg';
import sufflesong from '@assets/cd/shuffle-icon.svg';
import cdList from '@assets/cd/music-list-icon.svg';
import ModalBackground from '@components/ModalBackground';
import DataList from '@components/datalist/DataList';
import YouTube, { YouTubeEvent } from 'react-youtube';
import { useNavigate, useParams } from 'react-router-dom';
import { getCdRack } from '@apis/cd';

export default function CdPlayer({ cdInfo }: { cdInfo: CDInfo }) {
  const [isCdListOpen, setIsCdListOpen] = useState(false);
  const [cdDatas, setCdDatas] = useState(null);

  // cd 초기상태 관리
  const [cdReady, setCdReady] = useState({
    isPlaying: false,
    isLooping: true,
    volume: 20,
    previousVolume: 20,
    isMuted: false,
  });

  // Youtube 컴포넌트 상태가 변화할때 발생하는 이벤트 객체
  const [cdStateChangeEvent, setCdStateChangeEvent] = useState(null);

  // cd 재생시간 관리
  const [cdPlayer, setCdPlayer] = useState({
    progress: 0,
    currentTime: 0,
    duration: 0,
  });

  const navigate = useNavigate();
  const myCdId = Number(useParams().cdId);
  const userId = Number(useParams().userId);
  const videoId = cdInfo.youtubeUrl.match(/[?&]v=([^&]+)/)[1];

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
    },
  };

  // const formattedCds = mockCD.data.map((cd) => ({
  //   id: String(cd.myCdId),
  //   title: cd.title,
  //   artist: cd.artist,
  //   released_year: cd.releaseDate,
  //   album: cd.album,
  // }));

  const progressStyle = {
    background: `linear-gradient(to right, #162C63 ${cdPlayer.progress}%, #E5E7EB ${cdPlayer.progress}%)`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCdRack(userId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [myCdId]);

  // 재생 시간 업데이트 함수
  useEffect(() => {
    if (cdStateChangeEvent) {
      const interval = setInterval(() => {
        const current = cdStateChangeEvent.target.getCurrentTime();
        const total = cdStateChangeEvent.target.getDuration();

        setCdPlayer((prev) => ({
          ...prev,
          currentTime: current,
          duration: total,
          progress: (current / total) * 100,
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [cdStateChangeEvent]);

  // useEffect(() => {
  //   if (cdStateChangeEvent) {
  //     cdStateChangeEvent.target.stopVideo();

  //     const newVideoId = cdInfo.youtubeUrl?.match(/[?&]v=([^&]+)/)?.[1];

  //     if (newVideoId) {
  //       // 새 비디오 로드 및 재생
  //       cdStateChangeEvent.target.loadVideoById(newVideoId);
  //     }
  //   }
  // }, [myCdId, cdInfo]);

  // 시간 포맷팅 함수
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (Number(e.target.value) / 100) * cdPlayer.duration;
    setCdPlayer((prev) => ({ ...prev, currentTime: newTime }));
    cdStateChangeEvent.target.seekTo(newTime);
  };

  const handleMuteCdVolume = (event: YouTubeEvent<number>) => {
    if (!cdReady.isMuted) {
      setCdReady((prev) => ({
        ...prev,
        previousVolume: prev.volume,
        isMuted: true,
        volume: 0,
      }));
      event?.target.setVolume(0);
    } else {
      event?.target.setVolume(String(cdReady.previousVolume));
      setCdReady((prev) => ({
        ...prev,
        volume: prev.previousVolume,
        isMuted: false,
      }));
    }
  };

  const handleChangeCdVolume = (
    event: YouTubeEvent<number>,
    volume: string,
  ) => {
    event?.target.setVolume(volume);
    setCdReady((prev) => ({
      ...prev,
      volume: Number(volume),
      previousVolume: Number(volume),
      isMuted: false,
    }));
  };

  const handleOnOffCd = (event: YouTubeEvent<number>) => {
    if (event.data === 2 || event.data === 0 || null) {
      event?.target.playVideo();
      setCdReady((prev) => ({ ...prev, isPlaying: true }));
    } else if (event.data === 1) {
      event?.target.pauseVideo();
      setCdReady((prev) => ({ ...prev, isPlaying: false }));
    }
  };

  const handleGoBeforeCd = () => {
    if (cdStateChangeEvent) {
      cdStateChangeEvent.target.stopVideo();
    }
    navigate(`/cd/${myCdId - 1}/user/${+userId}`);
  };

  const handleGoAfterCd = () => {
    if (cdStateChangeEvent) {
      cdStateChangeEvent.target.stopVideo();
    }
    navigate(`/cd/${myCdId + 1}/user/${+userId}`);
  };

  const handleToggleLoop = () => {
    const newLoopState = !cdReady.isLooping;
    setCdReady((prev) => ({ ...prev, isLooping: newLoopState }));
  };
  return (
    <>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={(e) => {
          console.log(e.target);
          e.target.setVolume(cdReady.volume);
          e.target.playVideo();
          setCdReady((prev) => ({
            ...prev,
            isPlaying: true,
            volume: 20,
            previousVolume: 20,
            isMuted: e.target.playerInfo.muted,
          }));
          setCdPlayer((prev) => ({
            ...prev,
            duration: e.target.getDuration(),
          }));
        }}
        onStateChange={(e) => {
          console.log(e.target);
          if (e.data === 0) {
            if (cdReady.isLooping) {
              setTimeout(() => {
                e.target.seekTo(0);
                e.target.playVideo();
              }, 100);
            } else {
              setCdReady((prev) => ({
                ...prev,
                isPlaying: false,
              }));
            }
          }
          setCdStateChangeEvent(e);
        }}
      />
      <div className='w-full h-[13vh] shrink-0  '>
        {/* 진행 시간 */}
        <style>
          {`
            .progress-range::-webkit-slider-runnable-track {
              width: 100%;
              height: 4px;
              cursor: pointer;
              background: ${progressStyle.background};
              border-radius: 1.3px;
            }
           .progress-range:focus::-webkit-slider-runnable-track {
              background: ${progressStyle.background};
            }
          `}
        </style>
        <div>
          <input
            type='range'
            min='0'
            max='100'
            value={cdPlayer.progress}
            onChange={handleChangeTime}
            className='focus:ring-0 progress-range'
          />
        </div>

        <div className=' w-full h-full relative'>
          <div className='flex items-center absolute bottom-10  left-10 '>
            {/* 앨범 이미지 */}
            <img
              className='w-20 h-20 rounded-[8px]'
              src={cdInfo.coverUrl}
              alt='CD 앨범 이미지'
            />
            {/* 음량 */}
            <div className=' flex justify-center items-center gap-2 pl-13 '>
              {cdReady.isMuted ? (
                <button
                  onClick={() =>
                    handleChangeCdVolume(cdStateChangeEvent, '20')
                  }>
                  <img
                    className='w-8 h-8 cursor-pointer '
                    src={muteIcon}
                    alt='음량 아이콘'
                  />
                </button>
              ) : (
                <button onClick={() => handleMuteCdVolume(cdStateChangeEvent)}>
                  <img
                    className='w-8 h-8 cursor-pointer '
                    src={soundIcon}
                    alt='음량 아이콘'
                  />
                </button>
              )}

              <input
                type='range'
                min='0'
                max='100'
                value={cdReady.volume}
                onChange={(e) =>
                  handleChangeCdVolume(cdStateChangeEvent, e.target.value)
                }
                className='w-[85px] h-[4px] rounded-[1.3px] bg-[#162C63]
             appearance-none focus:outline-none focus:ring-2'
              />
            </div>
          </div>

          {/* 음악 컨트롤 버튼 */}
          <div className='flex items-center gap-[14px] cursor-pointer absolute bottom-14 left-1/2 -translate-x-1/2  '>
            {/* <button onClick={handleGoBeforeCd}>
              <img
                src={prevSong}
                alt='이전 노래 버튼'
              />
            </button> */}

            <button onClick={() => handleOnOffCd(cdStateChangeEvent)}>
              <img
                className='fill-black w-13 h-13 '
                src={cdReady.isPlaying ? pauseSong : playSong}
                alt='노래 일시정지 버튼'
              />
            </button>
            {/* <button onClick={handleGoAfterCd}>
              <img
                src={nextSong}
                alt='다음 노래 버튼'
              />
            </button> */}

            {/* 현재시간/ 총 재생 시간 */}
            {/* <div className='flex justify-center items-center gap-2 absolute right-[-100px] font-semibold '>
              <span className='text-black'>
                {formatTime(cdPlayer.currentTime)} /{' '}
              </span>
              <span className='text-black'>
                {formatTime(cdPlayer.duration)}
              </span>
            </div> */}
          </div>

          {/* 음악 부가기능 */}
          <div className='flex items-center gap-2.5 cursor-pointer absolute bottom-14 right-10'>
            <button
              onClick={handleToggleLoop}
              className={cdReady.isLooping ? 'opacity-100' : 'opacity-30'}>
              <img
                src={sufflesong}
                alt='cd 무한재생 버튼'
              />
            </button>

            <img
              onClick={() => setIsCdListOpen(true)}
              src={cdList}
              alt='cd 목록 리스트 보여주는 버튼'
            />
          </div>
        </div>
      </div>
      {isCdListOpen && (
        <ModalBackground onClose={() => setIsCdListOpen(false)}>
          <DataList
            datas={formattedCds}
            type='cd'
            hasMore={false}
            isLoading={false}
            fetchMore={() => {}}
          />
        </ModalBackground>
      )}
    </>
  );
}
