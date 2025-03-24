import { useMemo, useState } from 'react';

export function useCdPlayerState(initialVolume: number) {
  // CD 상태 관리
  const [cdReady, setCdReady] = useState({
    isPlaying: false,
    isLooping: true,
    volume: initialVolume,
    previousVolume: initialVolume,
    isMuted: false,
  });

  // 재생 시간 관리
  const [cdPlayer, setCdPlayer] = useState({
    progress: 0,
    currentTime: 0,
    duration: 0,
  });

  // 스타일 계산 메모이제이션
  const progressStyle = useMemo(
    () => ({
      background: `linear-gradient(to right, white ${cdPlayer.progress}%, #FFFFFF4D ${cdPlayer.progress}%)`,
    }),
    [cdPlayer.progress],
  );

  const volumeProgressStyle = useMemo(
    () => ({
      background: `linear-gradient(to right, #162C63 ${cdReady.volume}%, #E5E7EB ${cdReady.volume}%)`,
    }),
    [cdReady.volume],
  );

  return {
    cdReady,
    setCdReady,
    cdPlayer,
    setCdPlayer,
    progressStyle,
    volumeProgressStyle,
  };
}
