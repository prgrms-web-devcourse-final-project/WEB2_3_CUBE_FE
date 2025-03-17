import backgroundImg from '@assets/roome-background-img.png';
import gameMachine from '@assets/event/game-machine.svg';

import LayeredButton from '@components/LayeredButton';
import { useState } from 'react';
import { addEventJoin } from '@apis/event';
import { useToastStore } from '@/store/useToastStore';
import Loading from '@components/Loading';
import ResultScreen from './components/ResultScreen';
import { useFetchEvent } from '@hooks/event/useFetchEvent';

export default function EventPage() {
  const showToast = useToastStore((state) => state.showToast);

  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [joinStatus, setJoinStatus] = useState<JoinStatus>('idle');
  const { eventInfo, isLoading, isError } = useFetchEvent();

  const isJoinDisabled = !eventInfo?.id || joinStatus !== 'idle' || isLoading;

  const handleJoinEvent = async () => {
    if (joinStatus !== 'idle') return;
    setJoinStatus('joining');
    try {
      await addEventJoin(eventInfo?.id);
      setJoinStatus('success');
      showToast(`${eventInfo?.rewardPoints} 포인트를 획득했어요!`, 'success');
      setShowResult(true);
    } catch (error) {
      showToast(
        error?.response?.data.message || '알 수 없는 오류가 발생했어요.',
        'error',
      );
      setShowResult(false);
      setJoinStatus('fail');
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>{isError}</div>;

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImg})` }}
      className={`bg-cover bg-center bg-no-repeat h-screen item-middle `}>
      <div className='relative'>
        <img
          src={gameMachine}
          alt='오락 기계 이미지'
        />
        {/* 보여줄 화면 */}
        <ResultScreen
          showResult={showResult}
          eventInfo={eventInfo}
        />
        <div
          className={`absolute bottom-23 right-33  ${
            isJoinDisabled && 'pointer-events-none'
          }`}
          onClick={handleJoinEvent}>
          <LayeredButton
            theme='red'
            disabled={isJoinDisabled}
            className={`py-8 px-9 rounded-[10px] font-bold `}>
            {eventInfo?.id
              ? joinStatus === 'idle'
                ? '참여하기'
                : joinStatus === 'joining'
                ? '참여중...'
                : '참여 완료'
              : '준비중...'}
          </LayeredButton>
        </div>
      </div>
    </div>
  );
}
