import backgroundImg from '@assets/roome-background-img.png';
import gameMachine from '@assets/event/game-machine.svg';
import gameOver from '@assets/event/game-over.svg';
import time from '@assets/event/time.svg';
import point from '@assets/event/point.svg';

import LayeredButton from '@components/LayeredButton';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';

export default function EventPage() {
  const navigate = useNavigate();
  const isSuccess = true;

  const user = useUserStore().user;

  if (!user) navigate('/login', { replace: true });

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
        {isSuccess ? (
          <div className='absolute  top-34  left-48 flex flex-col items-center gap-4.5'>
            <div className='flex flex-col items-center'>
              <img
                className='w-39 mb-8'
                src={time}
                alt='이벤트 시각 이미지'
              />
              <img
                className='w-72'
                src={point}
                alt='획득 포인트 이미지'
              />
            </div>

            <p className='text-white  w-[170px] text-center text-[18px] font-bold '>
              선착순 5명 500 포인트 지급 이벤트
            </p>
          </div>
        ) : (
          <div className='absolute  top-34  left-48 flex flex-col items-center justify-center gap-11 '>
            <img
              src={gameOver}
              alt='게임오버 이미지'
            />
            <span className='text-white text-[18px] font-bold '>
              다음 이벤트에 참여해주세요
            </span>
          </div>
        )}
        <div className='absolute bottom-23 right-33'>
          <LayeredButton
            theme='red'
            className='py-8 px-9 rounded-[10px] font-bold'>
            포인트 받기
          </LayeredButton>
        </div>
      </div>
    </div>
  );
}
