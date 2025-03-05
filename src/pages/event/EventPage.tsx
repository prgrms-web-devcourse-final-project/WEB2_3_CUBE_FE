import backgroundImg from '@assets/roome-background-img.png';
import gameMachine from '@assets/event/game-machine.svg';
import gameOver from '@assets/event/game-over.svg';
import gameSuccess from '@assets/event/game-success.svg';

import LayeredButton from '@components/LayeredButton';
import { useEffect, useState } from 'react';
import { addEventJoin, getOngoingEvent } from '@apis/event';
import { useToastStore } from '@/store/useToastStore';

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

  // 현재 시간이 이벤트 열리는 시간보다 크거나 같을경우 true
  const isEventInProgress =
    new Date(eventInfo?.eventTime).getTime() + 9 * 60 * 60 * 1000 <= Date.now();

  console.log(isEventInProgress);

  // 이벤트 정보 조회 API 이벤트 열리는 시간 받아오기
  const handleJoinEvent = () => {
    const joinEvent = async () => {
      try {
        await addEventJoin(eventInfo.id);
        showToast(
          `${eventInfo.rewardPoints} 포인트를 획득했습니다!`,
          'success',
        );
        setShowResult(true);
      } catch (error) {
        showToast(
          error.response?.data.message || '알 수 없는 오류가 발생했습니다.',
          'error',
        );
        setShowResult(false);
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
      }
    };
    fetchData();
  }, []);

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

        {typeof showResult === 'boolean' && showResult === false && (
          <div className='absolute  top-44  left-49 flex flex-col items-center gap-4.5'>
            <div className='flex flex-col items-center'>
              <img
                src={gameOver}
                alt='게임 실패 이미지'
              />
            </div>

            <p className='text-white   text-center text-[18px] font-bold '>
              다음 이벤트에 참여해주세요
            </p>
          </div>
        )}
        {typeof showResult === 'boolean' && showResult === true && (
          <div className='absolute  top-54  left-42 flex flex-col items-center gap-4.5'>
            <div className='flex flex-col items-center'>
              <img
                src={gameSuccess}
                alt='게임 성공 이미지'
              />
            </div>

            <div className='font-bold'>
              <p className='text-white   text-center text-[18px]  '>
                {`선착순 ${eventInfo?.maxParticipants}명`}
              </p>
              <p className='text-white   text-center text-[18px] '>
                {` ${eventInfo?.rewardPoints} 포인트 지급 이벤트`}
              </p>
            </div>
          </div>
        )}

        <div
          className={`absolute bottom-23 right-33 `}
          onClick={handleJoinEvent}>
          <LayeredButton
            theme='red'
            className={`py-8 px-9 rounded-[10px] font-bold `}>
            {isEventInProgress ? '포인트 받기' : '이벤트 준비중'}
          </LayeredButton>
        </div>
      </div>
    </div>
  );
}
