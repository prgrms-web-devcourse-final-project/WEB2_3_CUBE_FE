import { useCallback } from 'react';
import { YouTubeEvent } from 'react-youtube';

export const useYoutubeControls = (
  cdReady: CdReady,
  cdPlayer: CdPlayer,
  cdStateChangeEvent: YouTubeEvent,
  setCdReady: React.Dispatch<React.SetStateAction<CdReady>>,
  setCdPlayer: React.Dispatch<React.SetStateAction<CdPlayer>>,
  setCdPlaying: (value: boolean) => void,
) => {
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
      if (!event) return;
      event.target.setVolume(volume);
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
      if (event.data === 1) {
        event.target?.pauseVideo();
        setCdReady((prev) => ({ ...prev, isPlaying: false }));
        setCdPlaying(false);
      } else {
        event.target?.playVideo();
        setCdReady((prev) => ({ ...prev, isPlaying: true }));
        setCdPlaying(true);
      }
    },
    [setCdPlaying],
  );

  const handleToggleLoop = useCallback(() => {
    const newLoopState = !cdReady.isLooping;
    setCdReady((prev) => ({ ...prev, isLooping: newLoopState }));
  }, [cdReady.isLooping]);

  return {
    handleChangeTime,
    handleMuteCdVolume,
    handleChangeCdVolume,
    handleOnOffCd,
    handleToggleLoop,
  };
};
