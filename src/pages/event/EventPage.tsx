import backgroundImg from '@assets/roome-background-img.png';
import gameMachine from '@assets/event/game-machine.svg';

import LayeredButton from '@components/LayeredButton';
import { useEffect, useState } from 'react';
import { addEventJoin, getOngoingEvent } from '@apis/event';
import { useToastStore } from '@/store/useToastStore';
import FailScreen from './components/FailScreen';
import SuccessScreen from './components/SuccessScreen';
import TypingText from '@components/TypingText';
import Loading from '@components/Loading';

interface EventInfo {
  eventName: string;
  eventTime: string;
  id: number;
  maxParticipants: number;
  rewardPoints: number;
}

export default function EventPage() {
  const showToast = useToastStore((state) => state.showToast);

  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [joinStatus, setJoinStatus] = useState<'idle' | 'joining' | 'joined'>(
    'idle',
  );

  // 이벤트 정보 조회 API 이벤트 열리는 시간 받아오기
  const handleJoinEvent = () => {
    const joinEvent = async () => {
      if (joinStatus !== 'idle') return;
      setJoinStatus('joining');
      try {
        await addEventJoin(eventInfo?.id);
        setJoinStatus('joined');
        showToast(`${eventInfo?.rewardPoints} 포인트를 획득했어요!`, 'success');
        setShowResult(true);
      } catch (error) {
        showToast(
          error?.response?.data.message || '알 수 없는 오류가 발생했어요.',
          'error',
        );
        setShowResult(false);
        setJoinStatus('idle');
      }
    };
    joinEvent();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOngoingEvent();
        setEventInfo(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <Loading />;
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
        {showResult === null && (
          <div className='absolute top-30  w-full'>
            <TypingText
              speed={150}
              pauseTime={1200}
              text={
                eventInfo?.id ? '이벤트가 열렸어요!' : `아직 이벤트가 없어요!`
              }
              className='h-[250px] text-[35px] font-bold text-white  text-center pt-20 '
            />
          </div>
        )}
        {typeof showResult === 'boolean' && showResult === false && (
          <FailScreen />
        )}
        {typeof showResult === 'boolean' && showResult === true && (
          <SuccessScreen eventInfo={eventInfo} />
        )}

        <div
          className={`absolute bottom-23 right-33  ${
            !eventInfo?.id && 'pointer-events-none'
          }`}
          onClick={handleJoinEvent}>
          <LayeredButton
            theme='red'
            disabled={!eventInfo?.id || joinStatus !== 'idle' || isLoading}
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
