import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import soundIcon from '@assets/cd/sound-icon.svg';
import muteIcon from '@assets/cd/mute-icon.svg';
import pauseSong from '@assets/cd/pause-icon.svg';
import playSong from '@assets/cd/play-icon.svg';
import sufflesong from '@assets/cd/shuffle-icon.svg';
import cdList from '@assets/cd/music-list-icon.svg';
import ModalBackground from '@components/ModalBackground';
import DataList from '@components/datalist/DataList';
import YouTube, { YouTubeEvent } from 'react-youtube';
import { useParams } from 'react-router-dom';
import { getCdRack, getCdRackSearch } from '@apis/cd';

export default function CdPlayer({
  cdInfo,
  onOffCdPlay,
  onCdTime,
}: {
  cdInfo: CDInfo;
  onOffCdPlay: (value: boolean) => void;
  onCdTime: (value: number) => void;
}) {
  const VOLUME = 10;
  const [isCdListOpen, setIsCdListOpen] = useState(false);
  const [cdRackInfo, setCdRackInfo] = useState<CdDataListInfo>({
    data: [],
    nextCursor: 0,
    totalCount: 0,
    firstMyCdId: 0,
    lastMyCdId: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [cursor, setCursor] = useState(0);
  const firstMyCdId = useRef(0);
  const lastMyCdId = useRef(0);

  const { userId: userIdParam } = useParams();
  const userId = useMemo(() => Number(userIdParam), [userIdParam]);

  // cd 초기상태 관리
  const [cdReady, setCdReady] = useState({
    isPlaying: false,
    isLooping: true,
    volume: VOLUME,
    previousVolume: VOLUME,
    isMuted: false,
  });

  // 현재 시간 툴팁(호버할때마다 리렌더링되는것을 막기위해 직접 DOM조작)
  const progressBarRef = useRef(null);
  const tooltipRef = useRef(null);

  // Youtube 컴포넌트 상태가 변화할때 발생하는 이벤트 객체
  const [cdStateChangeEvent, setCdStateChangeEvent] = useState(null);

  // cd 재생시간 관리
  const [cdPlayer, setCdPlayer] = useState({
    progress: 0,
    currentTime: 0,
    duration: 0,
  });

  const videoId = useMemo(() => {
    const match = cdInfo.youtubeUrl.match(/[?&]v=([^&]+)/);
    return match ? match[1] : '';
  }, [cdInfo.youtubeUrl]);

  const opts = useMemo(
    () => ({
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 1,
      },
    }),
    [],
  );

  // 시간 포맷팅 함수
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressStyle = useMemo(
    () => ({
      background: `linear-gradient(to right, white ${cdPlayer.progress}%, #E5E7EB ${cdPlayer.progress}%)`,
    }),
    [cdPlayer.progress],
  );

  const volumeProgressStyle = useMemo(
    () => ({
      background: `linear-gradient(to right, #162C63 ${cdReady.volume}%, #E5E7EB ${cdReady.volume}%)`,
    }),
    [cdReady.volume],
  );

  // ----------------함수----------------------

  // 검색에 대한 cd목록 가져오기
  const fetchCdSearchData = async () => {
    try {
      const result = searchInput
        ? await getCdRackSearch(userId, searchInput, 7, cursor)
        : await getCdRack(userId, 7, cursor);

      const formattedDatas = result.data.map((item: CDInfo) => ({
        id: String(item.myCdId),
        title: item.title,
        artist: item.artist,
        album: item.album,
        released_year: item.releaseDate,
      }));
      firstMyCdId.current = result.firstMyCdId;
      lastMyCdId.current = result.lastMyCdId;
      setCdRackInfo((prev) => ({
        ...result,
        data:
          cursor === 0
            ? formattedDatas // 첫 페이지(cursor=0)이면 데이터 대체
            : [...prev.data, ...formattedDatas], // 아니면 데이터 추가
      }));
    } catch (error) {
      if (cursor === 0) {
        setCdRackInfo((prev) => ({ ...prev, data: [] }));
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setCursor(0);
  }, [searchInput]);

  useEffect(() => {
    fetchCdSearchData();
  }, [searchInput, cursor]);

  // 재생 시간 업데이트 함수
  useEffect(() => {
    if (cdStateChangeEvent && cdReady.isPlaying) {
      const interval = setInterval(() => {
        try {
          const current = cdStateChangeEvent.target.getCurrentTime();
          const total = cdStateChangeEvent.target.getDuration();
          onCdTime(Math.floor(current));
          setCdPlayer((prev) => ({
            ...prev,
            currentTime: current,
            duration: total,
            progress: (current / total) * 100,
          }));
        } catch (error) {
          console.error('재생 시간 업데이트 중 오류:', error);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cdStateChangeEvent]);

  useEffect(() => {
    const bar = progressBarRef.current;
    const tooltip = tooltipRef.current;
    if (!bar || !tooltip) return;

    const handleMouseMove = (e) => {
      const rect = bar.getBoundingClientRect();
      const position = ((e.clientX - rect.left) / rect.width) * 100;
      const time = (position / 100) * cdPlayer.duration;
      tooltip.textContent = formatTime(time);
      tooltip.style.left = `calc(${position}% - 20px)`;
      tooltip.style.display = 'block';
    };

    const handleMouseEnter = () => {
      tooltip.style.display = 'block';
    };

    const handleMouseLeave = () => {
      tooltip.style.display = 'none';
    };
    bar.addEventListener('mousemove', handleMouseMove);
    bar.addEventListener('mouseenter', handleMouseEnter);
    bar.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      bar.removeEventListener('mousemove', handleMouseMove);
      bar.removeEventListener('mouseenter', handleMouseEnter);
      bar.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cdPlayer.duration]);

  const handleChangeTime = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTime = (Number(e.target.value) / 100) * cdPlayer.duration;
      setCdPlayer((prev) => ({ ...prev, currentTime: newTime }));
      cdStateChangeEvent.target.seekTo(newTime);
    },
    [cdStateChangeEvent, cdPlayer.duration],
  );

  const handleMuteCdVolume = useCallback(
    (event: YouTubeEvent<number>) => {
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
    },
    [cdReady.isMuted, cdReady.previousVolume],
  );

  const handleChangeCdVolume = useCallback(
    (event: YouTubeEvent<number>, volume: string) => {
      event?.target.setVolume(volume);
      setCdReady((prev) => ({
        ...prev,
        volume: Number(volume),
        previousVolume: Number(volume),
        isMuted: false,
      }));
    },
    [],
  );
  const handleOnOffCd = useCallback(
    (event?: YouTubeEvent<number>) => {
      if (!event) return;

      if (event.data === 2 || event.data === 0 || event.data === null) {
        event.target?.playVideo(); // event.target이 없을 수도 있으니 ? 붙여줌
        setCdReady((prev) => ({ ...prev, isPlaying: true }));
        onOffCdPlay(true);
      } else if (event.data === 1) {
        event.target?.pauseVideo();
        setCdReady((prev) => ({ ...prev, isPlaying: false }));
        onOffCdPlay(false);
      }
    },
    [onOffCdPlay],
  );

  const handleToggleLoop = useCallback(() => {
    const newLoopState = !cdReady.isLooping;
    setCdReady((prev) => ({ ...prev, isLooping: newLoopState }));
  }, [cdReady.isLooping]);

  // YouTube 이벤트 핸들러 메모이제이션
  const handleYouTubeReady = useCallback(
    (e: YouTubeEvent<any>) => {
      e.target.setVolume(cdReady.volume);
      e.target.playVideo();
      setCdStateChangeEvent(e);
      setCdReady((prev) => ({
        ...prev,
        isPlaying: true,
        volume: VOLUME,
        previousVolume: VOLUME,
        isMuted: e.target.playerInfo.muted,
      }));
      setCdPlayer((prev) => ({
        ...prev,
        duration: e.target.getDuration(),
      }));
    },
    [cdReady.volume],
  );

  const handleYouTubeStateChange = useCallback(
    (e: YouTubeEvent<number>) => {
      if (e.data === 0) {
        if (cdReady.isLooping) {
          onOffCdPlay(true);
          setTimeout(() => {
            e.target.seekTo(0);
            e.target.playVideo();
          }, 100);
        } else {
          setCdReady((prev) => ({
            ...prev,
            isPlaying: false,
          }));
          onOffCdPlay(false);
        }
      }
      setCdStateChangeEvent(e);
    },
    [cdReady.isLooping],
  );
  return (
    <>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={handleYouTubeReady}
        onStateChange={handleYouTubeStateChange}
      />
      <section className='w-full h-[13vh] shrink-0 backdrop-blur-[20px] bg-white/10  '>
        {/* 진행 시간 */}
        <style>
          {`
            .progress-range::-webkit-slider-runnable-track {
              width: 100%;
              height: 10px;
              cursor: pointer;
              background: ${progressStyle.background};
              border-radius: 1px;
            }
           .progress-range:focus::-webkit-slider-runnable-track {
              background: ${progressStyle.background};
            }
          .volume-range::-webkit-slider-runnable-track {
            width: 85px;
            height: 4px;
            cursor: pointer;
            background: ${volumeProgressStyle.background};
            border-radius: 1.3px;
          }
          .volume-range:focus::-webkit-slider-runnable-track {
            background: ${volumeProgressStyle.background};
          }
          `}
        </style>
        <input
          type='range'
          min='0'
          max='100'
          ref={progressBarRef}
          value={cdPlayer.progress}
          onChange={handleChangeTime}
          className=' progress-range h-[17px] block'
        />
        <div
          ref={tooltipRef}
          className='absolute top-[-40px] bg-gray-800 text-white px-2 py-1 rounded text-xs'
          style={{ display: 'none' }}
        />

        <section className='relative w-full h-full  flex items-center pr-4'>
          {/* 왼쪽 그룹: 앨범 이미지와 음량 조절 */}
          <article className='flex items-center gap-14 flex-1 h-full '>
            {/* 앨범 이미지 */}
            <img
              className='h-full block'
              src={cdInfo.coverUrl}
              alt='CD 앨범 이미지'
            />

            {/* 음량 */}
            <div className='flex items-center justify-center gap-2'>
              {cdReady.isMuted ? (
                <button
                  onClick={() =>
                    handleChangeCdVolume(cdStateChangeEvent, `${VOLUME}`)
                  }>
                  <img
                    className='w-8 h-8 cursor-pointer'
                    src={muteIcon}
                    alt='음량 아이콘'
                  />
                </button>
              ) : (
                <button onClick={() => handleMuteCdVolume(cdStateChangeEvent)}>
                  <img
                    className='w-8 h-8 cursor-pointer'
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
                className='volume-range w-20'
              />
            </div>
          </article>

          {/* 중앙 그룹: 재생 버튼과 시간 - 왼쪽으로 조정 */}
          <article className='flex flex-col items-center ] '>
            <button onClick={() => handleOnOffCd(cdStateChangeEvent)}>
              <img
                className='w-13 h-13'
                src={cdReady.isPlaying ? pauseSong : playSong}
                alt='노래 일시정지 버튼'
              />
            </button>
          </article>

          {/* 오른쪽 그룹: 부가 기능 */}
          <article className='flex items-center gap-2.5 flex-1 justify-end'>
            <button
              onClick={handleToggleLoop}
              className={cdReady.isLooping ? 'opacity-100' : 'opacity-30'}>
              <img
                src={sufflesong}
                alt='cd 무한재생 버튼'
              />
            </button>

            <button onClick={() => setIsCdListOpen(true)}>
              <img
                src={cdList}
                alt='cd 목록 리스트 보여주는 버튼'
              />
            </button>
          </article>
        </section>
      </section>
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
    </>
  );
}
