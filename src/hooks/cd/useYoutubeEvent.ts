import { useEffect, useState } from 'react';
import { YouTubeEvent } from 'react-youtube';

export function useYouTubeEvents(
  cdReady: CdReady,
  initialVolume: number,
  setCdReady: React.Dispatch<React.SetStateAction<CdReady>>,
  setCdPlayer: React.Dispatch<React.SetStateAction<CdPlayer>>,
  setCdPlaying: (value: boolean) => void,
  setCurrentTime: (value: number) => void,
) {
  // Youtube 컴포넌트 상태가 변화할때 발생하는 이벤트 객체
  const [cdStateChangeEvent, setCdStateChangeEvent] =
    useState<YouTubeEvent | null>(null);

  // YouTube 준비 완료 이벤트 핸들러
  const handleYouTubeReady = (e) => {
    e.target.setVolume(cdReady.volume);
    e.target.pauseVideo();

    setCdStateChangeEvent(e);
    setCdReady(
      (prev: CdReady): CdReady => ({
        ...prev,
        isPlaying: false,
        volume: initialVolume,
        previousVolume: initialVolume,
        isMuted: e.target.playerInfo.muted,
      }),
    );

    setCdPlayer(
      (prev: CdPlayer): CdPlayer => ({
        ...prev,
        duration: e.target.getDuration(),
      }),
    );
  };

  // YouTube 상태 변경 이벤트 핸들러
  const handleYouTubeStateChange = (e) => {
    // 영상이 끝났을 때 (e.data === 0)
    if (e.data === 0) {
      if (cdReady.isLooping) {
        // 무한반복 설정되어 있으면 처음으로 돌아가서 다시 재생
        setCdPlaying(true);
        setTimeout(() => {
          e.target.seekTo(0);
          e.target.playVideo();
        }, 100);
      } else {
        // 무한반복 설정이 꺼져있으면 일시정지 상태로
        setCdReady((prev) => ({
          ...prev,
          isPlaying: false,
        }));
        setCdPlaying(false);
      }
    }
    setCdStateChangeEvent(e);
  };

  // 재생 시간 업데이트 효과
  useEffect(() => {
    if (cdStateChangeEvent && cdReady.isPlaying) {
      const interval = setInterval(() => {
        try {
          const current = cdStateChangeEvent.target.getCurrentTime();
          const total = cdStateChangeEvent.target.getDuration();
          setCurrentTime(Math.floor(current));
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
  }, [cdStateChangeEvent, cdReady.isPlaying, setCurrentTime, setCdPlayer]);

  return {
    cdStateChangeEvent,
    handleYouTubeReady,
    handleYouTubeStateChange,
    setCdStateChangeEvent,
  };
}
